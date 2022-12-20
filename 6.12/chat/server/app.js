const {Server} = require("socket.io")
const {createServer} = require('http')
const dotenv = require('dotenv')

dotenv.config()

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log('Connected')
    socket.on("chat-message", (message) => {
        socket.broadcast.emit("chat-message", message)
    })
})

httpServer.listen(process.env.PORT || 5000)
