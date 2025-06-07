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
        // Generate JWT Token
        await sendEmail(user.email, `আপনার Hafsa Smart Solution লগইনের OTP কোড`, OtpVerificationEmail(user.name, otpGen));
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

const verifyOTP = async (userId: string, otp: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const existingOtp = await Otp.findOne({ user: userId, otp })
            .sort({ createdAt: -1 })
            .session(session);
        if (!existingOtp) {
            throw new AppError(404, "OTP not found.");
        }
        if (!existingOtp.expiresAt || existingOtp.expiresAt < new Date()) {
            throw new AppError(400, "OTP has expired.");
        }
        await Otp.deleteOne({ _id: existingOtp._id }).session(session);
        await session.commitTransaction();
        session.endSession();
        return {
            message: "OTP verified successfully.",
            data: {
                userId: existingOtp.user,
                otp: existingOtp.otp,
            },
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};



export const UserService = {
    createUser,
    login,
    verifyOTP
}