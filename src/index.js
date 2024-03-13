import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})

const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8800, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("PostgreSQL connection failed !!! ", err);
  });
