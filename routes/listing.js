const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware.js")
const { listingSchema} = require("../Schema.js");
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const user = require("../models/user.js");

const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    } else {
        next();
    }
};

//index route
router.get("/",
    wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
}));

//new route
router.get("/new",
    isLoggedIn,
    (req,res)=>{
    res.render("listings/new.ejs");
})

//show route
router.get("/:id",
    wrapAsync(async(req,res)=>{
    const {id} = req.params;
    
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","you are search for listing not found")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{listing})
}));

//create route
router.post("/",
    isLoggedIn,
    validateListing,wrapAsync(async(req,res)=>{
let newlisting = new Listing(req.body.listing);
if(!req.body.listing){
}
await newlisting.save();
req.flash("success","New listing created !");
res.redirect("/listings");
}));

//edit route
router.get("/:id/edit",
    isLoggedIn,
    wrapAsync(async(req,res)=>{
        console.log(req.body);
        
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route
router.put("/:id",
    isLoggedIn,
    wrapAsync(async(req,res)=>{
 if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing");
}
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing is updated !");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id",
    isLoggedIn,
    wrapAsync(async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing is Deleted!");
    res.redirect("/listings");
}));

module.exports = router;