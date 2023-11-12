"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendListController = void 0;
const express_1 = __importDefault(require("express"));
const route_builder_1 = require("../components/route_builder");
const friend_list_model_1 = require("../database/models/friend_list.model");
class FriendListController {
    static get(req, res) {
        const id = req.query['id'];
        friend_list_model_1.FriendListModel.findOne({ id })
            .then((doc) => {
            console.log(doc.friends);
            res.send("ok");
        })
            .catch((reason) => {
            res.status(400).send("not found");
        });
    }
    static post(req, res) {
        res.send("hello world");
    }
}
FriendListController.router = express_1.default.Router();
__decorate([
    (0, route_builder_1.route)(route_builder_1.routeMethod.get, "/friend-list")
], FriendListController, "get", null);
__decorate([
    (0, route_builder_1.route)(route_builder_1.routeMethod.post, "/friend-list")
], FriendListController, "post", null);
exports.FriendListController = FriendListController;
//# sourceMappingURL=friend_list.controller.js.map