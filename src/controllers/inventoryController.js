const inventory = []
let currentId = 1

exports.addItem = (req, res) => {
    const {name, stock, price } = req.body;
    const item = {id: currentId++, name, stock, price}
    inventory.push(item)
    res.status(201).json(item)
} 

exports.getAllItems = (req, res) => {
    res.json(inventory)
}

exports.getItemById = (req, res) => {
    const item = inventory.find(inventoryItem => {
        return inventoryItem.id === parseInt(req.params.id)
    })
    if(!item) return res.status(404).json({message: "Item not found"})
    res.json(item)
}

exports.updateItemById = (req, res) => {
    const item = inventory.find(inventoryItem => {
        return inventoryItem.id === parseInt(req.params.id)
    })
    if(!item) return res.status(404).json({message: "Item not found"})
    
    const {name, stock, price} = req.body
    if(name !== undefined) item.name = name
    if(stock !== undefined) item.stock = stock
    if(price !== undefined) item.price = price
    res.status(200).json(item)
}

exports.deleteItemById = (req, res) => {
    const itemIndex = inventory.findIndex(inventoryItem => {
        return inventoryItem.id === parseInt(req.params.id)
    })
    if(itemIndex === -1) return res.status(404).json({message: "Item not found"})
    inventory.splice(itemIndex, 1)
    res.status(204).send()
}