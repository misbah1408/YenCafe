import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log("MONGODB connection SUCCESS");
    
    // console.log(data);
  } catch (error) {
    // Handle connection or data fetching errors
    console.error("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;