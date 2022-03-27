var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = Schema({
    bookId: Number,
    bookName: String,
    author: String,
    isbn: String
}, { versionKey: false, collection: "books" })

var booksModel = mongoose.model('books', booksSchema);
module.exports = booksModel;