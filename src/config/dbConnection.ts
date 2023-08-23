import mongoose from "mongoose";
require('dotenv').config();


async function connectDB(){
    try{
        await mongoose.connect(process.env.DB_URL!);
        console.log('***** Database Connected *****');
    }catch(err){
        console.log(' --- Database Error ---', err );
    }
}

export default connectDB;