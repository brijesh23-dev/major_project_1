const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const {  reviewSchema } = require("../Schema.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middleware.js");
const reviewController = require("../controller/review.js")


const validateReview = (req,res,next)=>{
    let { error } = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next();
    }
}

//ADD-Review route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

//delete review route

router.delete("/:reviewId",
    wrapAsync(reviewController.destroyReview))

module.exports = router;