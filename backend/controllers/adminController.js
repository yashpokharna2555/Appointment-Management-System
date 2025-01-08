import validator from "validator";
import bcrypt from 'bcrypt'
import { v2  as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        console.log(name, email, password, speciality, degree, experience, about, fees, address);
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email Details" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password length should be more than 7" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctor_data = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience, // Correct spelling
            about,
            fees,
            address: typeof address === "string" ? JSON.parse(address) : address,
            Date: new Date(), // Capital "D"
        };

        const newDoctor = new doctorModel(doctor_data);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

//API for admin login
const loginAdmin = async (req,res) =>{
    try {
        const {email, password} = req.body
        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({ success: false, message: error.message });        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get all doctors list for admin panel

const allDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success: true, doctors})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}


//API to get all appointment list
const appointmentAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success: true, appointments})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//API to cancel appointment for admin
const appointmentCancel = async (req,res) => {
    try {
        const { appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

       

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

//API to get dashboard data to admin panel

export {addDoctor, loginAdmin, allDoctors, appointmentAdmin, appointmentCancel}
