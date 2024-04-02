import express from "express";
import routes from "./routes/user.routes.js";

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.use("/", routes);

export { app };
