const Listing = require("./models/listing")
module.exports.isLoggedIn = (req,res,next)=>{
        if(!req.isAuthenticated()){
            req.session.redirectUrl = req.originalUrl;
        req.flash("error","login to get access of listings");
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

module.exports.isOwner = async(req,res,next) =>{
        const {id} = req.params;
        let listing = await Listing.findById(id);

    if( ! listing.owner._id.equals(res.locals.Curruser._id)){
        req.flash("error","you are not owner of this listing !");
         return res.redirect(`/listings/${id}`);
    }
    next()
}
