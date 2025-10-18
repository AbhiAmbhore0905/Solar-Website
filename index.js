const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/message", require("./routes/message.route"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "resource not found" })
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: "server error", error: err.message })
    next()
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongo connected")
    app.listen(process.env.PORT, console.log("server running"))
})