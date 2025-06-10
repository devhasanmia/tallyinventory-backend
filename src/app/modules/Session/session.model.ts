import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISession extends Document {
    user: Types.ObjectId;
    deviceId: string;
    accessToken: string;
    refreshToken: string;
    isActive: boolean;
    createdAt: Date;
    expiresAt: Date;
}

const sessionSchema = new Schema<ISession>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deviceId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
});

const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
