import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log("MONGODB connection SUCCESS");
    const fetchedData = await mongoose.connection.collection("foodItems");
    const data = await fetchedData.find({}).toArray();
    if(!data){
      console.error("error");
    } else{
      global.food_items = data
    }

    // console.log(data);
  } catch (error) {
    // Handle connection or data fetching errors
    console.error("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
