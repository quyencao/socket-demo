'use strict';
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const express = require('express');
const getRandomMessage = require('./message');

const app = express();

// Middleware
app.use(cors());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/files'));

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('sendMessage', (text) => {
    console.log('Message: ' + text);
    socket.emit('receiveMessage', getRandomMessage());
  });

  socket.on('disconnect', () => {
    console.log('User disconnected...');
  });
});

server.listen(process.env.PORT || 5005, () => {
  console.log('Server listening on port %d ', server.address().port);
});