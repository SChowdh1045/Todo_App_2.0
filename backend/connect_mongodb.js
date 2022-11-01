import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/todo", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Successfully connected to database");
    } catch(err){
        console.log("Failed to connect to database", err);
    }
}

export default connectDB;