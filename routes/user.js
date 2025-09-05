const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport")

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup",async(req,res)=>{
    try{
    let {email,username,password} = req.body;
    const newUser = await User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.flash("success"," welcome to wanderlust");
    res.redirect("/listings")
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
})

router.get("/login",
    passport.authenticate('local',
     { 
    failureRedirect: '/login',
    failureflash:true
     }),
    async(req,res)=>{
        req.flash("success","Welcome ! to wanderlust");
        res.render("/users/login.ejs");
    })

module.exports = router;