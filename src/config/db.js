const { default: mongoose } = require("mongoose")


const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://jishnusnair22:OHr63Sc87oFt6GFI@cluster0.zucla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB connected successfully');
        
    } catch(err) {
        console.log(err);   
    }
}

module.exports = connectDB