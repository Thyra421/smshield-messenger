"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendListModel = void 0;
const mongoose_1 = require("mongoose");
const friendListSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    friends: { type: [mongoose_1.Schema.Types.ObjectId], required: true, default: [] }
});
exports.FriendListModel = (0, mongoose_1.model)("FriendList", friendListSchema);
//# sourceMappingURL=friend_list.model.js.map