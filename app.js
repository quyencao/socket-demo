'use strict';
const cors = require('cors');
const express = require('express');
const app = express();

const getRandomMessage = require('./message');

app.use(cors());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/files'));

const server = app.listen(process.env.PORT || 5005, () => {
  console.log('Server listening on port %d ', server.address().port);
});

const io = require('socket.io')(server);

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

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
