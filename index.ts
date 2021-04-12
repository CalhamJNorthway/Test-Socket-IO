import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

let userCount = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket: Socket) => {
  socket.on('userConnection', (userName: string) => {
    console.log('user: ' + userName + ' has connected.');
    io.emit('connectionChange', { userName, event: 'entry' });
  })

  socket.on('chat message', (request: { value: string, user: string }) => {
    io.emit('chat message', request);
  });

  socket.on('userDisconnect', (userName: string) => {
    console.log('user disconnected');
    io.emit('connectionChange', { userName, event: 'exit' });
  })
});
server.listen(8080, () => {
  console.log('listening on PORT:8080');
});