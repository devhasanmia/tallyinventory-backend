import { model, Schema } from "mongoose";
import { TOtp } from "./otp.type";

const otpSchema = new Schema<TOtp>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
    }
}, { timestamps: true });

const Otp = model<TOtp>("Otp", otpSchema);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default Otp