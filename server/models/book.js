/*

    File name: book.js
    Created By: Rahul Kumar
    Student ID: 301174739
    Created on: 01 March, 2021

*/

let mongoose = require('mongoose');

// create a model class
let bookModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},
{
    collection: "books"
});

module.exports = mongoose.model('Book', bookModel);