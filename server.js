const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Allow CORS from Netlify frontend
app.use(cors({
  origin: "https://aryan11.netlify.app", // ✅ your frontend domain
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://aryan11.netlify.app", // ✅ required for Socket.IO
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ New client connected");

  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Chat backend is running");
});

server.listen(3000, () => {
  console.log("🚀 Server started on port 3000");
});
