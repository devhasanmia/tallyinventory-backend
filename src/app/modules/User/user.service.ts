import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { OtpVerificationEmail } from "../../utils/emails/OtpVerificationEmail";
import { RegistrationEmail } from "../../utils/emails/RegistrationEmail";
import { generateOTP } from "../../utils/otp";
import { sendEmail } from "../../utils/sendEmail";
import Otp from "../otp/otp.model";
import User from "./user.model";
import { TUser } from "./user.type";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import config from "../../config";
// Create new Users
const createUser = async (payload: TUser) => {
    try {
        if (payload.designation === "Business Owner" || payload.designation === "Sales Executive") {
            payload.status = "inactive"
            payload.verification = "pending"
        }
        sendEmail(payload.email, `আপনার একটি ${payload.designation} প্রোফাইল সফলভাবে তৈরি হয়েছে!`, RegistrationEmail(payload.name, payload.designation))
        const data = await User.create(payload);
        return data;
    } catch (error) {
        throw error
    }
}

// Login Function
const login = async (payload: Pick<TUser, "email" | "password">) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findOne({ email: payload.email }).session(session);
        if (!user) {
            throw new AppError(400, "Access denied! Incorrect email or password");
        }
        const isPasswordValid = await bcrypt.compare(payload.password, user.password);
        if (!isPasswordValid) {
            throw new AppError(400, "Access denied! Incorrect email or password");
        }
        const otpGen = generateOTP();
        await Otp.create([{
            user: user._id,
            otp: otpGen,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        }], { session });
        await sendEmail(user.email, `আপনার Hafsa Smart Solution লগইনের OTP কোড`, OtpVerificationEmail(user.name, otpGen));
        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            config.JWT_SECRET as string,
            { expiresIn: "20m" as const }
        );
        await session.commitTransaction();
        session.endSession();
        return {
            message: "OTP has been sent to your Email. Please verify.",
            token,
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


export const verifyOTP = async (userId: string, otp: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("ইউজার পাওয়া যায়নি");
    }
    const otpEntry = await Otp.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!otpEntry) {
        throw new Error("OTP পাওয়া যায়নি");
    }
    const now = new Date();
    if (otpEntry.otp !== Number(otp) || (otpEntry.expiresAt && now > otpEntry.expiresAt)) {
        throw new Error("OTP ভুল অথবা মেয়াদোত্তীর্ণ");
    }
    await Otp.deleteMany({ user: userId });
    return {
        message: "সফলভাবে লগইন হয়েছে",
        user,
    };
};


export const UserService = {
    createUser,
    login
}