import mongoose, { Schema, model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    mobile: string;
    password: string;
    status?: boolean
}

const UserSchema = new Schema<IUser>({
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    password: { type: String },
    status: { type: Boolean, default: false }
})

export default model<IUser>('User', UserSchema)