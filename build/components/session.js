"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const client_1 = require("./client");
/** Holds reference to all the connected clients. */
class Session {
    constructor() {
        this.clients = [];
    }
    /** Creates a new client from a socket, adds it to the list of clients and returns the new client. */
    Add(socket) {
        const client = new client_1.Client(socket);
        this.clients.push(client);
        console.log("[SESSION] Client added");
        return client;
    }
    Remove(client) {
        const index = this.clients.findIndex(c => c == client);
        if (index == -1)
            return;
        this.clients.splice(index, 1);
        console.log("[SESSION] Client removed");
    }
    Find(id) {
        const client = this.clients.find(c => c.id == id);
        return client;
    }
}
exports.Session = Session;
//# sourceMappingURL=session.js.map