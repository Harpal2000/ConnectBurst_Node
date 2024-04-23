import express from "express";
import cors from "cors"


const app = express();

app.use(cors())
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.get('/', (req, res) => {
    res.json({ message: "CONNECT BURST GET REQUEST" })
})

app.post('/', (req, res) => {
    res.json({ message: "CONNECT BURST POST REQUEST" })
})

import userRoutes from "./routes/user.routes.js";
import followRoutes from "./routes/follow.routes.js";
import messageRoutes from "./routes/message.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/follow", followRoutes);
app.use("/api/v1/chat", messageRoutes);

export { app };
