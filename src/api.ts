import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { WebSocketServer, WebSocket } from 'ws'
import { createServer } from 'http'
import { SERVER_PORT } from './config/config'
import { Client } from './components/client'
import { Session } from './components/session'
import { MessageResolver } from './resolvers/message.resolver'
import { connectToTheDatabase } from './database/database.connect'
import * as dotenv from "dotenv";
import { friendListRouter } from './routers/friend_list.router'

dotenv.config();

const app: express.Application = express().use(cors()).use(bodyParser.json())
const server = createServer(app)
const wss: WebSocketServer = new WebSocketServer({ server: server })
const session: Session = new Session()
const messageResolver: MessageResolver = new MessageResolver(session)

connectToTheDatabase();
server.listen(SERVER_PORT)

wss.on('connection', (socket: WebSocket) => {
    const client: Client = session.Add(socket)

    socket.on("close", reason => {
        session.Remove(client)
    })

    socket.on('message', message => {
        const jsonMessage = JSON.parse(message.toString())

        messageResolver.resolve(client, jsonMessage)
    })
})

app.get("/", (req, res) => { res.send("OK") })

app.use("/friend-list", friendListRouter)