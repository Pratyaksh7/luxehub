import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    password: { type: String },
    status: { type: Boolean, default: false }
});
export default model('User', UserSchema);
