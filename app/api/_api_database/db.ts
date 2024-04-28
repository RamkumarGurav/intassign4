import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  try {
    // Check if the MongoDB URI is defined
    // if (!MONGODB_URI) {
    //   throw new Error("MongoDB URI is not defined");
    // }

    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
      console.log("Already connected");
      return;
    }

    if (connectionState === 2) {
      console.log("Connecting...");
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI!, {
      dbName: "mdb_ramportfolio100",
      bufferCommands: false,
    });
    console.log("Connected");
  } catch (error) {
    console.error("Error connecting to Database:", error);
    throw new Error("Error connecting to Database");
  }
};

export default connect;
