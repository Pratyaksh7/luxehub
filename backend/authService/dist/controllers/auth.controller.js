import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
export const Ping = (req, res, next) => {
    try {
        return res
            .status(200)
            .json({ status: "ok", message: "Auth Service is healthy." });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const Signup = async (req, res, next) => {
    const { name, email, mobile, password } = req.body;
    try {
        // let existingUser: typeof User | null;
        let existingUser;
        let isEmail;
        if (email) {
            existingUser = await User.findOne({ email });
            isEmail = true;
        }
        else if (mobile) {
            existingUser = await User.findOne({ mobile });
            isEmail = false;
        }
        if (existingUser) {
            return res
                .status(400)
                .json({ status: 'error', message: 'User already registered.' });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: encryptedPassword,
            mobile,
            status: true,
        });
        res.status(201).json({ status: 'ok', message: 'User created successfully.' });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
export const Signin = async (req, res, next) => {
    const { email, mobile, password } = req.body;
    let existingUser;
    let isEmail = false;
    try {
        if (email) {
            existingUser = await User.findOne({ email }); // Use findOne for single lookup
            isEmail = true;
        }
        else if (mobile) {
            existingUser = await User.findOne({ mobile });
            isEmail = false;
        }
        if (!existingUser) {
            return res.status(200).json({ status: 'error', message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(200).json({
                status: 'error',
                message: 'You have entered a wrong password, Please try again.',
            });
        }
        const token = jwt.sign({
            _id: existingUser._id,
            user: isEmail ? existingUser.email : existingUser.mobile,
        }, process.env.USER_JWT_SECRET);
        const data = {
            _id: existingUser._id,
            name: existingUser.name, // Assuming name exists
            user: isEmail ? existingUser.email : existingUser.mobile,
            token,
        };
        return res.status(200).json({ status: 'ok', message: 'Login successful', data });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
