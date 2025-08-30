const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String
    },
    image: {
      type:String,
      default:"https://images.unsplash.com/photo-1752779588163-51d574029899?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      set:v =>
        v=== ""
      ? "https://images.unsplash.com/photo-1752779588163-51d574029899?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      : v,
},
    price: {
        type: Number,
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    },
    ],
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;

