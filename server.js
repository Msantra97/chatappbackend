const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const register = require('./register');
const login = require('./login');
const createMessage = require('./createMessage');
const USERS = require('./models/users');
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())
const PORT = 3010;


    mongoose.connect('mongodb+srv://zephyr:VU4HSoHnEaGyxOxY@cluster0.ownantv.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');


    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('Connected to MongoDB database!');
    });

app.get('/', (req, res) => {
  res.send('Socket server is running.');
});

app.post("/user/register",register)
app.post("/user/login",login)


const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

// USERS.findByIdAndUpdate

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`Client ${socket.id} joined room ${roomName}`);
  });

  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName);
    console.log(`Client ${socket.id} left room ${roomName}`);
  });

  socket.on('message', (data) => {
    const roomName = data.roomName;
    console.log(data);
    // createMessage(data.senderId, data.receiverId, data.message ,Date.now());                                    
    socket.to(roomName).emit('message', [data.userName, data.message]);
    
  });
  socket.on('typing', (data) => {
    const roomName = data.roomName;                                 
    socket.to(roomName).emit('typing', [data.userName]);
    
  });
});
