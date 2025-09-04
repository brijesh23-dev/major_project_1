const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const {  reviewSchema } = require("../Schema.js");
const Review = require("../models/review.js")


const validateReview = (req,res,next)=>{
    let { error } = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next();
    }
}

//ADD-Review route
router.post('/',
    validateReview,
    wrapAsync(async(req,res)=>{
        console.log(" id: ",req.params.id);
        
     let listing = await Listing.findById(req.params.id);
     if(!listing){
         req.flash("error", "Listing not found!");
        return res.redirect("/listings");
     }
     let newReview = new Review(req.body.review)
     console.log(newReview);
     
     listing.reviews.push(newReview);
     await listing.save();
     await newReview.save();
      req.flash("success","review  is added !");
     res.redirect(`/listings/${listing._id}`)
}));

//delete review route

router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    console.log(" working ..")
    let{id , reviewId} = req.params;
    console.log(id,  reviewId);
    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
}))

module.exports = router;