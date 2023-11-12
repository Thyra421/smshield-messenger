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
    static exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield friend_list_model_1.FriendListModel.exists({ id: new mongoose_1.Types.ObjectId(id) });
                return res != null;
            }
            catch (_) {
                return false;
            }
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield friend_list_model_1.FriendListModel.aggregate([
                    { $match: { "id": new mongoose_1.Types.ObjectId(id) } },
                    { $lookup: { from: "users", localField: "friends", foreignField: "_id", as: "friends" } },
                    { $project: { "_id": 0, "friends.name": 1, "friends._id": 1 } }
                ]);
                if (results == null || results.length == 0)
                    return null;
                const friends = results[0].friends.map(f => {
                    const friendDTO = { id: f._id, name: f.name };
                    return friendDTO;
                });
                const friendList = { friends: friends };
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
                yield friend_list_model_1.FriendListModel.create({ id: new mongoose_1.Types.ObjectId(id) });
                return true;
            }
            catch (_) {
                return false;
            }
        });
    }
    static addOne(id, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield friend_list_model_1.FriendListModel.updateOne({ id: new mongoose_1.Types.ObjectId(id) }, { $push: { friends: new mongoose_1.Types.ObjectId(friendId) } });
                return true;
            }
            catch (_) {
                return false;
            }
        });
    }
    static removeOne(id, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield friend_list_model_1.FriendListModel.updateOne({ id: new mongoose_1.Types.ObjectId(id) }, { $pull: { friends: new mongoose_1.Types.ObjectId(friendId) } });
                return true;
            }
            catch (_) {
                return false;
            }
        });
    }
}
exports.FriendListRepository = FriendListRepository;
//# sourceMappingURL=friend_list.repository.js.map