const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use('/',express.static(__dirname+'/public'));

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
      });
      socket.on('new_msg',(data)=>{
        //io.emit('msg_rcvd',data);
        socket.broadcast.emit('msg_rcvd',data)
      });
    })


  server.listen(3000, () => {
    console.log('listening on *:3000');
  }) 