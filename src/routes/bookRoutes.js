const express = require('express')
const Book = require('../models/bookModel')

const router = express.Router()

router.post('/create', async(req, res) => {
    try {
        const {title, author, genre, price, stock} = req.body

        const isBookExist = await Book.findOne({title:title})
        if(isBookExist) {
            return res.status(400).json({
                message: "Book already exists, update the stock of the existing book",
                success: false
            })
        }

        const book = new Book({title, author, genre, price, stock})
        book.save()

        res.status(201).json({
            message: 'Book successfully created',
            success: true
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/booksList', async(req, res) => {
    try {
        const bookList = await Book.find()
        return res.json({
            data: bookList,
            success: true
        })
    } catch(err) {
        res.status(400).json(err)
    }
})

router.put('/update/:id', async(req, res) => {
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
})

router.delete('/:id', async(req, res) => {
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
})


module.exports = {booksRouter: router}