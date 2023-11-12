"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenHelper {
    static parseEmail(token) {
        try {
            const verified = jsonwebtoken_1.default.verify(String(token), String(process.env.JWT_SECRET));
            return verified.email;
        }
        catch (err) {
            return undefined;
        }
    }
}
exports.TokenHelper = TokenHelper;
//# sourceMappingURL=token.helper.js.map