require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
app.use(express.json())
const connectDB = require('./config/db');
const { booksRouter } = require('./routes/bookRoutes')

connectDB();

app.use('/api/v1/books', booksRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});