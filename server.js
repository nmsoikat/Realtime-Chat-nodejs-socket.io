const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))


app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/index.html');
})


const PORT = process.env.PORT || 8800
http.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})


// Socket
io.on('connection', (socket) => {
  console.log('Socket.io connected');

  // receive message form client // appMessage is event name and it can be any name
  socket.on('appMessage', (msg) => {

    // send to all connected user
    socket.broadcast.emit('broadcastMessage', msg)
  })
})