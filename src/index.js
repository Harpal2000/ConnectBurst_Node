import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const server = connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running at PORT", process.env.PORT, "!!");
    });
  })
  .catch((err) => {
    console.error("PostgreSQL connection failed !! ", err);
  });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:1234",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiver_id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
