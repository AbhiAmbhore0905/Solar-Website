const mongoose = require("mongoose")

module.exports = mongoose.model("message", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    message: { type: String, required: true },

    isActive: { type: Boolean, default: true },
}, { timestamps: true }))