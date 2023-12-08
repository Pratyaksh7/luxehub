const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    mobile: {type: String},
    password: {type: String},
    status: {type:Boolean, default:false}
})

const User = new mongoose.model('User', UserSchema);
module.exports = User;