const validateItem = (req, res, next) => {
    const {name, stock} = req.body
    if (!name || !stock) {
        return res.status(400).json({message: "Name and Stock are required"})
    }
    next()
}

module.exports = validateItem;