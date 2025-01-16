import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"; 

export const register = async (req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save()
        res.status(200).send("User has been created")
    } catch (err) {
        next(err)
    }
}

export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if(!user) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
            if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))

            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT,{
                expiresIn: '15m',
            });

            const { password, isAdmin , ...otherDetails } = user._doc
        res.
            cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details:{...otherDetails}, isAdmin})
    } catch (err) {
        next(err)
    }
}








// import userModel from "../models/User.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import validator from "validator";

// // Create a JWT token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
// };

// // Register a new user
// const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     // Validate email and password
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Please enter a valid email" });
//     }

//     if (password.length < 8) {
//       return res.json({ success: false, message: "Please enter a strong password" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.json({ success: true, message: "User has been created" });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // Log in an existing user
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User doesn't exist" });
//     }

//     // Compare the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid credentials" });
//     }

//     // Generate a token
//     const token = createToken(user._id);

//     // Send the token in the response
//     res.json({
//       success: true,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { register, login };
