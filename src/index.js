import connectDB from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8800, () => {
      console.log("Server is running at PORT", process.env.PORT,"!!");
    });
  })
  .catch((err) => {
    console.log("PostgreSQL connection failed !! ", err);
  });
