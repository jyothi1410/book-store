var express = require('express');
var router = express.Router();
var { getBooks } = require('./books');

router.get('/books', (req, res) => { getBooks(req, res)})

module.exports = router
