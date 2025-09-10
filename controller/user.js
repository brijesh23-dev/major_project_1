const User = require("../models/user");

module.exports.signup = async(req,res)=>{
    try{
    let {email,username,password} = req.body;
    const newUser = await User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.logIn(registeredUser,(err)=>{
        if(err){
            return next(err)
        }
    req.flash("success"," welcome to wanderlust");
    res.redirect("/listings")
    })

    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
}

module.exports.renderLoginform = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
        req.flash("success","Welcome ! to wanderlust you are logged in");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }

    module.exports.logout = (req,res,next)=>{
        console.log(req.user);
        req.logout((err)=>{
            if(err){
                return next(err)
            }
        req.flash("success","user logged out");
        res.redirect("/listings")
        })
    }