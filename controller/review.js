const Listing = require("../models/listing")
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // let { rating} = req.body.review;

    // if (Array.isArray(rating)) {
    //     rating = number(rating[1])
    // }

    const newReview = new Review(req.body.review);
    // console.log("body ", req.body.review);
    //  console.log(newReview);


    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    req.flash("success", "review  is added !");
    res.redirect(`/listings/${listing._id}`)
}

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review  is deleted !");
    res.redirect(`/listings/${id}`)
}