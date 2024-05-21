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
import uploadRoutes from "./routes/upload.routes.js";
import likeRoutes from "./routes/like.routes.js";
import commentRoutes from "./routes/comment.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/follow", followRoutes);
app.use("/api/v1/chat", messageRoutes);
app.use("/api/v1/s3", uploadRoutes);
app.use("/api/v1/user/like", likeRoutes);
app.use("/api/v1/user/comment", commentRoutes);

export { app };
