const http = require('http');
const express = require ('express');
const fs = require('fs');
const path = require('path');
const socketio = require('socket.io');
const formatPesan = require('./utils/messages');


const app = express();
const server = http.createServer(app);
const PORT = 3000 || process.env.PORT;
const io = socketio(server);
// const optionsSSL= {
//     key: fs.readFileSync("srv/www/key/my-site.pem")
//     cert: fs.readFileSync("srv/www/key/chain.pem")
    
// }

//set static folder public
app.use(express.static(path.join(__dirname,'public')));


let Bot = "messageBot";

// run when client connect 

io.on('connection' , socket => {
    // welcome chat 
    socket.emit ("message", formatPesan(Bot,"welcome............"));
    // broadcast when user connect 
    socket.broadcast.emit('message',formatPesan(Bot,"A some user connected "))


    // user disconect 
    socket.on('disconnect',() => {
        io.emit('message',formatPesan(Bot,'A some user disconneted'))
    })

    // listern dari chat server 
    socket.on('chatMessage',(msg) => {
        io.emit('message',formatPesan("user",msg))
        console.log(msg)
    })
})


server.listen(PORT,() =>  console.log(`Server listen on port ${PORT}`));