import jwt from 'jsonwebtoken'

//Doctor Authentication auth middleware

const authDoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Get the Authorization header
        console.log("authDoctor.js - Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ success: false, message: "not authorized" });
        }

        const dToken = authHeader.split(" ")[1]; // Extract the token
        const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);
        
        req.body.docId = tokenDecode.id; // Attach the doctor ID to the request
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authDoctor