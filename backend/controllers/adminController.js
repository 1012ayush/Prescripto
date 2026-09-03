import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
// API for adding doctor
// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        // 1. Destructure the data from the request
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // 2. Checking for all data to add doctor (ADDED !imageFile HERE)
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // 3. Validating the email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // 4. Validating the strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a valid password (min 8 characters)" });
        }

        // 5. Hashing doctor password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 6. Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // 7. Prep data for the database
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
            available: true // ADDED THIS to satisfy your Mongoose Schema!
        };

        // 8. Save to Database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // 9. Send a single success response
        res.json({ success: true, message: "Doctor Added Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api for the admin login

const loginAdmin = async (req, res) => {
try{

    const {email , password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true, token})

    } else {
        res.json({success:false, message:"Invalid Credentials"})
    }
}
catch(error){
    console.log(error);
    res.json({ success: false, message: error.message })
}
}

// API to get alldoctors list for admin panel

const allDoctors = async(req , res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export { addDoctor, loginAdmin, allDoctors };