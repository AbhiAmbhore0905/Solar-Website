const { adminRegister, adminLogin, adminLogout } = require("../controllers/auth.controller")

const router = require("express").Router()
router

    .post("/admin-register", adminRegister)
    .post("/admin-login", adminLogin)
    .post("/admin-logout", adminLogout)


module.exports = router
