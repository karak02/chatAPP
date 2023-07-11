const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3001

http.listen(PORT,()=> {
    console.log(`Lissing on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=> {
    res.sendFile(__dirname + '/index.html')
})

//Socket
const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log("connect...")
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
        // console.log(msg)
    })
})