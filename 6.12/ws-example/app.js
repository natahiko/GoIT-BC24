import {WebSocketServer} from 'ws'

import dotenv from 'dotenv'
dotenv.config()

const wsServer = new WebSocketServer({port: process.env.PORT || 5000})

wsServer.on('connection', (wsClient) => {
    console.log('Connected')

    wsClient.on('message', (message) => {
        const newMessage = message.toString();
        console.log('New message: ', newMessage)
        if(newMessage === "Hello") wsClient.send('hello to you')
        else wsClient.send('got it!')
    })
})

console.log('Server started on port' + process.env.PORT)
