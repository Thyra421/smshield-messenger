import WebSocket from "ws"
import { MessageBase } from "./messages/base.message"
import { MessageNotificationDTO } from "./dtos/message_notification.dto"

class Client {
    id: string
    readonly socket: WebSocket

    constructor(socket: WebSocket) {
        this.socket = socket
    }

    Send(message: MessageNotificationDTO) {
        this.socket.send(JSON.stringify(message))
    }

    Identify(id: string) {
        this.id = id
    }
}

export { Client }