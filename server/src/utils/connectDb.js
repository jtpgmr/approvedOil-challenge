import mongoose from "mongoose";
import dotenv from "dotenv";

import log from "./log.js";

dotenv.config();
const mongoUri = process.env.MONGO_URI

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(mongoUri);

    log.info(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    log.error(
      "MongoServerError: bad auth : Authentication failed -- MongoURI may be invalid"
    );
    process.exit(1);
  }
};

export default connectDb;