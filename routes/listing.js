const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing");
const {isLoggedIn, isOwner} = require("../middleware.js")
const { listingSchema} = require("../Schema.js");
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const user = require("../models/user.js");

const listingController = require("../controller/listing.js")

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
    wrapAsync(listingController.index));

//new route
router.get("/new",
    isLoggedIn,
    listingController.newFormrender
    )

//show route
router.get("/:id",
    wrapAsync(listingController.showListing));

//create route
router.post("/",
    isLoggedIn,
    validateListing,wrapAsync(listingController.createListing));

//edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing));

//update route
router.put("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));

module.exports = router;