const { createChatbotEntry, getAllChatbotEntries, downloadChatbotExcel } = require("../controllers/chatbot.controller")

const { adminProtected } = require("../middleware/auth.middleware")

const router = require("express").Router()

router
    .post("/create-entry", createChatbotEntry)  // Public route
    .get("/get-all", adminProtected, getAllChatbotEntries) // Protected
    .get("/download-excel", adminProtected, downloadChatbotExcel) // Protected

module.exports = router
