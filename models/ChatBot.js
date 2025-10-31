const mongoose = require("mongoose")

module.exports = mongoose.model("chatbot", new mongoose.Schema({
    userType: {
        type: String,
        enum: ["buyer", "seller", "inquiry"],
        required: true
    },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    megawatt: { type: Number, required: true },

    isActive: { type: Boolean, default: true }
}, { timestamps: true }))
