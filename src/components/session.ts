import { Client } from "./client"
import { WebSocket } from 'ws'

/** Holds reference to all the connected clients. */
class Session {
    readonly clients: Client[] = []

    /** Creates a new client from a socket, adds it to the list of clients and returns the new client. */
    Add(socket: WebSocket): Client {
        const client: Client = new Client(socket)
        this.clients.push(client)
        console.log("[SESSION] Client added")
        return client
    }

    Remove(client: Client) {
        const index = this.clients.findIndex(c => c == client)
        if (index == -1) return
        this.clients.splice(index, 1)
        console.log("[SESSION] Client removed")
    }

    Find(id: String): Client | undefined {
        const client = this.clients.find(c => c.id == id)
        return client
    }
}

export { Session }