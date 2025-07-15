const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('message', { user: 'System', text: `${username} joined the chat` });
  });

  socket.on('chat message', (msg) => {
    io.emit('message', { user: socket.username, text: msg });
  });

  socket.on('disconnect', () => {
    if (socket.username)
      io.emit('message', { user: 'System', text: `${socket.username} left the chat` });
  });
});

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});