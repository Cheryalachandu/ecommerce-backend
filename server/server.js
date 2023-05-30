import mongoose from "mongoose";
import { config } from "dotenv";

config();

const dataBaseConnection = () => {
  mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
    console.log("Database connected Successfully");
  });
};

export default dataBaseConnection;
