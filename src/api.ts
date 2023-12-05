import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { WebSocketServer, WebSocket } from 'ws'
import { createServer } from 'http'
import { SERVER_PORT } from './config/config'
import { Client } from './components/client'
import { connectToTheDatabase } from './database/database.connect'
import * as dotenv from "dotenv";
import { friendListRouter } from './routers/friend_list.router'
import { userRouter } from './routers/user.router'
import { messengerRouter } from './routers/messenger.router'
import { session } from './components/session'

dotenv.config();

const app: express.Application = express().use(cors()).use(bodyParser.json())
const server = createServer(app)
const wss: WebSocketServer = new WebSocketServer({ server: server })

connectToTheDatabase();
server.listen(SERVER_PORT)

wss.on('connection', (socket: WebSocket) => {
    const client: Client = session.Add(socket)

    socket.on("close", reason => {
        session.Remove(client)
    })

    socket.on('message', async message => {
        try {
            client.Identify(message.toString())
        }
        catch (e) {
            console.log("Invalid message")
        }
    })
})

app.get("/", (req, res) => { res.send("OK") })

app.use("/friend-list", friendListRouter)

app.use("/user", userRouter)

app.use("/messenger", messengerRouter)