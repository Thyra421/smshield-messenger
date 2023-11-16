import WebSocket from "ws"
import { MessageBase } from "./messages/base.message"

class Client {
    id: string
    readonly socket: WebSocket

    constructor(socket: WebSocket) {
        this.socket = socket
    }

    Send(type: string, body: MessageBase) {
        const message = { "type": type, body: body }
        this.socket.send(JSON.stringify(message))
    }

    Identify(id: string) {
        this.id = id
    }
}

export { Client }