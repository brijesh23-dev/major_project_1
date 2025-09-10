const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/user.js")

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup",userController.signup)

router.get("/login",userController.renderLoginform);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate('local',
     { 
    failureRedirect: '/login',
    failureFlash:true,
     }),userController.login
    );

    router.get("/logout",userController.logout)

module.exports = router;