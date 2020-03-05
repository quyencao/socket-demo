'use strict';

const socket = io();

setInterval(() => {
  socket.emit('sendMessage', 'Hello');
}, 1000);

socket.on('receiveMessage', function (replyText) {
  if (replyText == '') replyText = '(No answer...)';
  console.log(replyText);
});
