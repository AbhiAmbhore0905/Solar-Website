const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

exports.adminRegister = asyncHandler(async (req, res) => {
    const result = await Admin.findOne({
        $or: [
            { email: req.body.email },
            { mobile: req.body.mobile }
        ]
    })

    if (result) {
        return res.status(401).json({ message: "email / mobile already exist" })
    }

    const hash = await bcrypt.hash(req.body.password, 10)

    await Admin.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hash
    })

    res.json({ message: "admin register success" })
})

exports.adminLogin = asyncHandler(async (req, res) => {
    const { username } = req.body
    const result = await Admin.findOne({
        $or: [
            { email: username },
            { mobile: username }
        ]
    })
    if (!result) {
        return res.status(401).json({ message: "email / mobile does not exist" })
    }
    const verify = await bcrypt.compare(req.body.password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "invalid password" })
    }
    const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY)
    res.cookie("ADMIN", token, { maxAge: 1000 * 60 * 24 * 24, httpOnly: true, secure: false })
    res.json({
        message: "admin login success", result: {
            _id: result._id,
            name: result.name,
            photo: result.photo,
            mobile: result.mobile,
        }
    })
})

exports.adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("ADMIN")
    res.json({ message: "admin logout success" })
})