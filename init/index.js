const Listing = require("../models/listing.js");
const initData = require("./data.js");
const mongoose = require("mongoose");

main()
.then(()=>{
    console.log("connected to db  successful")
})
.catch(err => console.log("error:",err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
};

const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'68be7de81fc3a9cbd1d48afa'}));
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data.");
}

initDB();


