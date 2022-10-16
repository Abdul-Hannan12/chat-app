const io = require('socket.io')(8000);
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const users = {};

io.on('connection', socket =>{

    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

});