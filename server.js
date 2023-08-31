

const express = require('express');
const app = express();

const http = require('http').createServer(app)

const PORT = process.env.PORT || 4000

http.listen(PORT, ()=>{
    console.log(`listening to the port ${PORT}`)
})

app.use(express.static(__dirname+'/public'))

app.get('/', (req, res)=>{
    // res.send('Hello World')
    res.sendFile(__dirname + '/index.html')
});

const io = require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('message',(msg)=>{
       socket.broadcast.emit('message',msg)
    })
})

