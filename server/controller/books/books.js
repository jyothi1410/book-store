var booksModel = require('../../models/index');

const getBooks = (req, res) => {
    let { page, size, title, offset = 0 } = req.query;
    if (page) {
        offset = parseInt(page - 1) * size;
        size = size
    }
    let query = {}
    if (title) query = { bookName: title }
    booksModel.find(query).limit(parseInt(size)).skip(parseInt(offset)).exec((err, data) => {
        if (err) res.status(500).json({ status: 500, message: "Failure", data: err });
        booksModel.count(query, async (err, count) => {
            let totalCount = await getBookCount()
            res.json({
                status: 200, message: "Success", data, totalCount,
                totalNumOfPages: (count % size) == 0 ? parseInt((count / size)) : parseInt((count / size) + 1)
            })
        })
    })
}

const getBookCount = (req, res) => {
    return new Promise((resolve, reject) => {
        booksModel.find().exec(function (err, data) {
            if (err) reject({});
            else {
                let count = data.length ? data.length : 0
                resolve(count);
            }
        })
    })
}


module.exports = { getBooks }