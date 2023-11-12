"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor(socket) {
        this.socket = socket;
    }
    Send(type, body) {
        const message = { "type": type, body: body };
        this.socket.send(JSON.stringify(message));
    }
    Identify(id) {
        this.id = id;
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map