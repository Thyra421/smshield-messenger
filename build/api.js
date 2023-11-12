"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const ws_1 = require("ws");
const http_1 = require("http");
const config_1 = require("./config/config");
const session_1 = require("./components/session");
const message_resolver_1 = require("./resolvers/message.resolver");
const database_connect_1 = require("./database/database.connect");
const dotenv = __importStar(require("dotenv"));
const friend_list_router_1 = require("./routers/friend_list.router");
dotenv.config();
const app = (0, express_1.default)().use((0, cors_1.default)()).use(body_parser_1.default.json());
const server = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ server: server });
const session = new session_1.Session();
const messageResolver = new message_resolver_1.MessageResolver(session);
(0, database_connect_1.connectToTheDatabase)();
server.listen(config_1.SERVER_PORT);
wss.on('connection', (socket) => {
    const client = session.Add(socket);
    socket.on("close", reason => {
        session.Remove(client);
    });
    socket.on('message', message => {
        const jsonMessage = JSON.parse(message.toString());
        messageResolver.resolve(client, jsonMessage);
    });
});
app.get("/", (req, res) => { res.send("OK"); });
app.use("/friend-list", friend_list_router_1.friendListRouter);
//# sourceMappingURL=api.js.map