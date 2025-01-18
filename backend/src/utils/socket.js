// web socket connection
import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
const app = express()

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


const hServer = http.createServer(app)

const io = new Server(hServer,{
    cors: {
      origin: ['http://localhost:5173']
    }
})

export function rSocketId (userId){
    return userSockets[userId]
}
//onlineUsers

const userSockets = {};

io.on("connection",(socket) =>{

    const userId = socket.handshake.query.userId;
    
    if(userId){
        userSockets[userId] = socket.id;
        console.log("User connected with socket id", socket.id, userId)
    }
    io.emit("getOnlineUsers", Object.keys(userSockets));

    console.log("user connected", socket.id)
    socket.on("disconnect",(socket) =>{
        console.log("user disconnected", socket.id)
        delete userSockets[userId];
        io.emit("getOnlineUsers", Object.keys(userSockets));
    }) 
})




export {io,app,hServer};