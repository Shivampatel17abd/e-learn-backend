import mongoose from "mongoose";
import { DB_name } from "../constains.js";

const connectDB = async () => {
    try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    // console.log(connectionInstance);
    
    } catch (error) {
        console.log("there is Error while connecting to the database",error);
        process.exit(1);
    }
}

export default connectDB