import express from "express";
import cors from "cors"


const app = express();

app.use(cors())
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export { app };
