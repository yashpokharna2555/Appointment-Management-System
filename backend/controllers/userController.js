import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// API to register users
const registerUser = async(req,res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !password || !email) {
            return res.json({success: false, message: "Missing Details"})
        }

        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid email"})
        }

        //validating strong password
        if(password.length < 8){
            return res.json({success: false, message: "Enter a strong Password"})
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({success: true, token})





    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

//API for user login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message: "User not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false,message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

//API to get userProgile data
const getProfile = async(req,res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({sucess: true, userData})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

//API to update user profile
const updateProfile = async(req,res) => {
    try {
        const {userId, name, phone, address, dob, gender} = req.body
        const imageFile = req.imageFile
        if(!name || !phone || !address || !dob || !gender){
            return res.json({succes: false, message: "Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address),dob,gender})
        if(imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: 'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image: imageUrl})
        }

        res.json({succes: true, message: "Profile Updated"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

//API to book appointment
const bookAppointment = async (req,res) => {
    try {
        const {userId, docId, slotDate, slotTime} = req.body;
        
        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available) {
            return res.json({succes: false, message: "Doctor not available"});
        }

        let slots_booked = docData.slots_booked

        //checking for slots availability

        if(slots_booked[slotDate]) {
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({succes: false, message: "Slot not available"});
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //Save newslots data in doctors data
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success: true, message: "Appointment Booked"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}
//API to get user appointment
const listAppointment = async (req,res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success: true, appointments})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

//API to cancel an appointment
const cancelAppointment = async (req,res) => {
    try {
        const {userId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user
        if(appointmentData.userId != userId) {
            return res.json({succes: false, message: "Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

        //Releasing doctors slot
        const {docId, slotDate, slotTime} = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        res.json({success: true, message: "Appointment Cancelled"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

const stripe = Stripe(process.env.STRIPE_SECRET);
//API to make payment using Stripe
const paymentStripe = async(req,res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in the smallest currency unit (e.g., cents for USD)
            currency, // 'usd', 'inr', etc.
            payment_method_types: ['card'], // You can add more methods
        });

        res.json({success: true, clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.json({success: false, message: "Payment Failed" });
    }
}
export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentStripe}