const express = require('express')
const router = express.Router()
const {addItem, getAllItems, getItemById, updateItemById, deleteItemById} = require('../controllers/inventoryController')
const authMiddleware = require('../middlewares/authMiddleware')
const validateItem = require('../middlewares/validateItem')

router.post('/products', authMiddleware, validateItem, addItem)
router.get('/products', authMiddleware, getAllItems)
router.get('/products/:id', authMiddleware, getItemById)
router.patch('/products/:id', authMiddleware, updateItemById)
router.delete('/products/:id', authMiddleware, deleteItemById)

module.exports = router