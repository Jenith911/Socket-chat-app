const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')

const {generateMeassage} = require('./utils/message')
const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection' , (socket) => {
  console.log('New user connected');

  socket.emit('newMessage' , generateMeassage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage' , generateMeassage('Admin' , 'New user joined'));

  socket.on('createMessage' , (message , callback) => {
    console.log('createMessage' , message);
    io.emit('newMessage' , generateMeassage(message.from , message.text));
    callback('This is from the server')
  });

  socket.on('disconnect' , () => {
    console.log('user was disconnected');
  });
  
});


server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });