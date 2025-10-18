const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.adminProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.ADMIN
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token" })
        }

        req.admin = data._id
        next()
    })
})    