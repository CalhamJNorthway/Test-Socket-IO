import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('userConnection', (userName) => {
    console.log('user: ' + userName + ' has connected.');
    io.emit('connectionChange', { userName, event: 'entry' });
  })

  socket.on('chat message', (request) => {
    io.emit('chat message', request);
  });

  socket.on('userDisconnect', (userName) => {
    console.log('user disconnected');
    io.emit('connectionChange', { userName, event: 'exit' });
  })
});
server.listen(PORT, () => {
  console.log('listening on PORT:8080');
});