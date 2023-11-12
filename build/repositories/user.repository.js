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
exports.UserRepository = void 0;
const user_model_1 = require("../database/models/user.model");
class UserRepository {
    static findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const friendList = yield user_model_1.UserModel.findOne({ email: email });
                return friendList;
            }
            catch (_) {
                return null;
            }
        });
    }
    static findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const friendList = yield user_model_1.UserModel.find({ name: { $regex: filter, $options: 'i' } });
                return friendList;
            }
            catch (_) {
                return null;
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map