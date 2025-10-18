const { createMessage, getAllMessages } = require("../controllers/message.controller")

const router = require("express").Router()
router

    .post("/create-message", createMessage)
    .get("/read-message", getAllMessages)


module.exports = router
