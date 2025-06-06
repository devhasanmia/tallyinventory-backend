import mongoose from "mongoose";

export type TOtp = {
    user: mongoose.Types.ObjectId;
    otp: number;
    expiresAt?: Date;
}
