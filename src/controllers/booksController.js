const Book = require('../models/bookModel')


exports.createBook = async(req, res) => {
    try {
        const books = req.body;

        if (!Array.isArray(books) || books.length === 0) {
            return res.status(400).json({
                message: "Invalid input. Please provide an array of books.",
                success: false
            });
        }

        const titles = books.map(book => book.title);

        const existingBooks = await Book.find({ title: { $in: titles } });

        if (existingBooks.length > 0) {
            return res.status(400).json({
                message: "Some books already exist. Consider updating their stock.",
                existingBooks: existingBooks.map(book => book.title),
                success: false
            });
        }

        await Book.insertMany(books);

        res.status(201).json({
            message: 'Books successfully created',
            success: true
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.retrieveBookList = async(req, res) => {
    try {

        const {author} = req.query
        let bookList;
        
        if(author) {
            bookList = await Book.find({ author: { $regex: new RegExp(author, "i") } });

            if (bookList.length === 0) {
                return res.status(404).json({
                    message: `No books found for author: ${author}`,
                    success: false
                });
            }
        } else {
            bookList = await Book.find()
        }

        res.json({
            data: bookList,
            success: true
        })
    } catch(err) {
        res.status(400).json(err)
    }
}

exports.updateById = async(req, res) => {
    try {

        const {title, author, genre, price, stock} = req.body

        const {id} = req.params
        const bookData = await Book.findByIdAndUpdate(id, {title, author, genre, price, stock}, {new:true}) 

        return res.json({
            data: bookData,
            success: true
        })
    } catch(err) {
        res.status(400).json(err)
    }
}

exports.deleteById = async(req, res) => {
    try {

        const {title, author, genre, price, stock} = req.body

        const {id} = req.params
        const bookData = await Book.findByIdAndDelete(id) 

        return res.json({
            message: "Book deleted.",
            success: true
        })
    } catch(err) {
        res.status(400).json(err)
    }
}

exports.getCount = async(req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        res.status(200).json({
            totalBooks,
            success:true
        })
    } catch(err) {
        res.status(400).json(err)
    }
}

exports.sortByPrice = async(req, res) => {
    try {
        const bookList = await Book.find().sort({price: 1});
        res.status(200).json({
            bookList,
            success:true
        })
    } catch(err) {
        res.status(400).json(err)
    }
}