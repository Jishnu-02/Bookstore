require("dotenv").config();
const { default: mongoose } = require("mongoose")
const mongoDBUriString = process.env.MONGODB_URI_STRING;

const connectDB = async() => {
    try {
        await mongoose.connect(mongoDBUriString)
        console.log('DB connected successfully');
        
    } catch(err) {
        console.log(err);   
    }
}

module.exports = connectDB