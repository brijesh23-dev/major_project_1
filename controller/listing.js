const Listing = require("../models/listing")
const ExpressError = require("../utils/ExpressError")

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
}

module.exports.newFormrender = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async(req,res)=>{
    const {id} = req.params;
    
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate : {path:"author"},
})
    .populate("owner");
    if(!listing){
        req.flash("error","you are search for listing not found")
        return res.redirect("/listings")
    }
    
    res.render("listings/show.ejs",{listing})
}

module.exports.createListing = async(req,res)=>{
let newlisting = new Listing(req.body.listing);
newlisting.owner = req.user._id;
if(!req.body.listing){
}
await newlisting.save();
req.flash("success","New listing created !");
res.redirect("/listings");
}

module.exports.editListing = async(req,res)=>{
        console.log(req.body);
        
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
} 

module.exports.updateListing = async(req,res)=>{
 if(!req.body.listing){
    throw new ExpressError(400,"send valid data for listing");
}
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing is updated !");
    res.redirect(`/listings/${id}`);
}


module.exports.destroyListing = async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing is Deleted!");
    res.redirect("/listings");
}