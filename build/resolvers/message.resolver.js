"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = void 0;
class MessageResolver {
    constructor(session) {
        this.session = session;
    }
    onIdentify(client, identify) {
        client.Identify(identify.id);
    }
    onMessage(client, message) {
        const recipent = this.session.Find(message.id);
        const body = { id: client.id, content: message.content };
        recipent === null || recipent === void 0 ? void 0 : recipent.Send("message", body);
    }
    resolve(client, jsonMessage) {
        const type = jsonMessage['type'];
        const body = jsonMessage['body'];
        if (type === 'identify') {
            this.onIdentify(client, body);
            return;
        }
        if (client.id === null)
            return;
        switch (type) {
            case ("message"):
                this.onMessage(client, body);
                break;
        }
    }
}
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.resolver.js.map