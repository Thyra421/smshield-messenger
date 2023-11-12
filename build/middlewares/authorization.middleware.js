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
exports.AuthorizationMiddleware = void 0;
const response_helper_1 = require("../helpers/response.helper");
const user_repository_1 = require("../repositories/user.repository");
const token_helper_1 = require("../helpers/token.helper");
class AuthorizationMiddleware {
    static checkAuthorization(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (token == null)
                return res.status(401).json(response_helper_1.ResponseHelper.error("Missing authorization token"));
            const email = token_helper_1.TokenHelper.parseEmail(token);
            if (email == null)
                return res.status(406).json(response_helper_1.ResponseHelper.error("Invalid authorization token"));
            const user = yield user_repository_1.UserRepository.findOne(email);
            if (user == null)
                return res.status(404).json(response_helper_1.ResponseHelper.error("User not found"));
            res.locals.id = user.id;
            next();
        });
    }
}
exports.AuthorizationMiddleware = AuthorizationMiddleware;
//# sourceMappingURL=authorization.middleware.js.map