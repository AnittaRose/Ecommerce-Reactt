const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddProductsSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true,
    },
    Price: {
        type: String,
    },
    Rating: {
        type: String,
    },
    Brand: {
        type: String,
    },
    Images: {
        type: [String], // Array of strings for multiple image paths
    },
    isBlocked: {
        type: Boolean,
        default: false, // New sellers are not blocked by default
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        // required: true,
      },
   
});

const AddProduct = mongoose.model('AddProduct', AddProductsSchema);
module.exports = AddProduct;
