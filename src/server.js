const express = require('express')
const app = express()
const port = 9999
const InventoryRoutes = require('./routes/inventoryRoutes')
app.use(express.json())

app.use('/', InventoryRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});