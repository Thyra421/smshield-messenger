"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendListRepository = void 0;
const mongoose_1 = require("mongoose");
const friend_list_model_1 = require("../database/models/friend_list.model");
class FriendListRepository {
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const friendList = yield friend_list_model_1.FriendListModel.findOne({ id: new mongoose_1.Types.ObjectId(id) });
                return friendList;
            }
            catch (_) {
                return null;
            }
        });
    }
    static create(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const friendList = yield friend_list_model_1.FriendListModel.create({ id: new mongoose_1.Types.ObjectId(id) });
                return friendList;
            }
            catch (_) {
                return null;
            }
        });
    }
    static addOne(id, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const friendList = yield friend_list_model_1.FriendListModel.updateOne({ id: new mongoose_1.Types.ObjectId(id) }, { $push: { friends: new mongoose_1.Types.ObjectId(friendId) } });
                return friendList;
            }
            catch (_) {
                return null;
            }
        });
    }
    static removeOne(id, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const friendList = yield friend_list_model_1.FriendListModel.updateOne({ id: new mongoose_1.Types.ObjectId(id) }, { $pull: { friends: new mongoose_1.Types.ObjectId(friendId) } });
                return friendList;
            }
            catch (_) {
                return null;
            }
        });
    }
}
exports.FriendListRepository = FriendListRepository;
//# sourceMappingURL=friend-list.repository.js.map