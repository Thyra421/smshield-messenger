import { Client } from "../components/client";
import { MessageIdentify } from "../components/messages/identify.message";
import { MessageMessage } from "../components/messages/message.message";
import { Session } from "../components/session";

export class MessageResolver {
    readonly session: Session

    constructor(session: Session) {
        this.session = session
    }

    private onIdentify(client: Client, identify: MessageIdentify) {
        client.Identify(identify.id)
    }

    private onMessage(client: Client, message: MessageMessage) {
        const recipent = this.session.Find(message.id)
        const body: MessageMessage = { id: client.id, content: message.content }
        recipent?.Send("message", body)
    }

    resolve(client: Client, jsonMessage) {
        const type: string = jsonMessage['type']
        const body = jsonMessage['body']

        if (type === 'identify') {
            this.onIdentify(client, body)
            return
        }

        if (client.id === null)
            return

        switch (type) {
            case ("message"):
                this.onMessage(client, body)
                break
        }
    }
}