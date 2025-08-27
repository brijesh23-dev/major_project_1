const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


main()
.then(()=>{
    console.log("connected to DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
};

app.listen(8080,(req,res)=>{
    console.log(" app is listening on port 8080");
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'/public')))


//home route
app.get("/",(req,res)=>{
    res.send("root page");
})
//index route
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
})

//new route
app.get("/listings/new",(req,res)=>{

    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id",async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
});

//create route
app.post("/listings",async(req,res)=>{
let newlisting = new Listing(req.body.listing);
await newlisting.save();
res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id",async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


