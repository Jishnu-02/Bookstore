const express = require('express')
const Book = require('../models/bookModel')
const { createBook, retrieveBookList, updateById, deleteById, getCount, sortByPrice } = require('../controllers/booksController')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, createBook);
router.get('/bookList', authMiddleware, retrieveBookList)
router.put('/update/:id', authMiddleware, updateById)
router.delete('/:id', authMiddleware, deleteById)
router.get('/count', authMiddleware, getCount)
router.get('/sort', authMiddleware, sortByPrice)

module.exports = {booksRouter: router}