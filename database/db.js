require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('The MongoDB is Connected Succesfully');
    }catch(e){
        console.log('MongoDB Connection Failed. Please Try Again');
        process.exit(1);
    }
}

module.exports = connectToDB;