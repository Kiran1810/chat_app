const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//const connect=require('./config/db-config')

app.set('view engine','ejs')
app.use('/',express.static(__dirname+'/public'));

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
      });
      //socket.on('new_msg',(data)=>{
        //io.emit('msg_rcvd',data);
        //socket.broadcast.emit('msg_rcvd',data)
        socket.on('join room',(data)=>{
          console.log('join the room',data.roomId)
          socket.join(data.roomId)
      });
      socket.on('new_msg',(data)=>{
        io.to(data.roomId).emit('msg_rcvd',data);
  console.log('received data',data)
      })
    })
    app.get('/chat/:roomId/:user',async(req,res)=>{
      res.render('index',
      {roomId:req.params.roomId,
      user:req.params.user},
      );
      
      
    
    })

    

  server.listen(3000,//async
  () => {
    console.log('listening on *:3000');
     //await connect();
  }) 