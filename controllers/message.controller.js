const asyncHandler = require("express-async-handler")
const Message = require("../models/Message")

exports.createMessage = asyncHandler(async (req, res) => {
    const { name, email, mobile, message } = req.body

    if (!name || !email || !mobile || !message) {
        return res.status(400).json({ message: "All fields are required" })
    }

    await Message.create({
        name,
        email,
        mobile,
        message
    })

    res.json({ message: "Message sent successfully" })
})

exports.getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 })

    if (!messages || messages.length === 0) {
        return res.status(404).json({ message: "No messages found" })
    }

    res.json(messages)
})
