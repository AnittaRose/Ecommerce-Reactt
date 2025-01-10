// const mongoose = require('mongoose');

// let CategorySchema = new mongoose.Schema({
//     Category: {
//         type: String
//     }
// });

// const Categories =  mongoose.model('Category', CategorySchema);

// module.exports = Categories;

const mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Ensure the name field is required
        unique: true      // Ensure the category name is unique
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
