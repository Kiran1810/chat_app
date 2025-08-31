const express = require('express');
const connect = require("./config/db-config");
const app = express();
const { ServerConfig } = require('./config');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//const connect=require('./config/db-config')

//const Group=require('./models/group')
const Chat=require('./models/chat')
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))


io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
      });
      
        socket.on('join room',(data)=>{
          console.log('join the room',data.roomId)
          socket.join(data.roomId)
      });

      socket.on('new_msg',async(data)=>{
        try {
          // Create a new chat message
          const chat = new Chat({
            content: data.message,
            roomId: data.roomId,
            sender: data.sender,
          });
    
          // Save the message to the database
          await chat.save();

           // Increment the message count for the room
      const roomMessages = await Chat.find({ roomId: data.roomId });
      const messageCount = roomMessages.length;

      // Broadcast the message count to all connected clients in the room
      io.to(data.roomId).emit('message_count', { count: messageCount });
    } catch (error) {
      console.error('Error saving message:', error);
    }
        
        io.to(data.roomId).emit('msg_rcvd',data);
  console.log('received data',data)
      });
    });

    app.get('/chat/:roomId/:user',async(req,res)=>{
      res.render('index',
      {
      roomId:req.params.roomId,
      user:req.params.user
    });
      
      })

app.get('/group',async(req,res)=>{
  res.render('group');
})

app.post('/group',(req,res)=>{
  Chat.create({
    name:req.body.name
  })
})
server.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
     await connect();
}) 