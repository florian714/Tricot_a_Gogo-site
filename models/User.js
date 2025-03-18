const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type:String, required: true},
    adresse: {type:String, required: true},
    city: {type:String, required: true},
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "client"], default: "client" }  // Par défaut, c'est un client
});

module.exports = mongoose.model("User", UserSchema);
