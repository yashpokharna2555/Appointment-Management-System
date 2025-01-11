import jwt from 'jsonwebtoken'

//Doctor Authentication auth middleware

const authDoctor = async (req,res,next) => {
    try {
        const {dToken} = req.headers
        if(!dToken){
            return res.json({success: false, message: "not authorized"})
        }

        const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);
        // if(tokenDecode!=process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        //     return res.json({success: false, message: "not authorized"})
        // }
        req.body.docId = token_decode.id
        

        next()
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

export default authDoctor