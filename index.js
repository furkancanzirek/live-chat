const express= require('express')
const socket = require('socket.io')
PORT =process.env.PORT ||8080
const app = express()
const server = app.listen(PORT)

app.use(express.static("public"))
const io=socket(server)

io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('chat',data=>{
        io.sockets.emit('chat',data)
    })
    socket.on('typing',data=>{
        socket.broadcast.emit('typing',data)
    })
})