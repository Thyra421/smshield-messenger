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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendListRouter = void 0;
const express_1 = __importDefault(require("express"));
const friend_list_repository_1 = require("../repositories/friend_list.repository");
const response_helper_1 = require("../helpers/response.helper");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const friend_list_middleware_1 = require("../middlewares/friend_list.middleware");
exports.friendListRouter = express_1.default.Router();
exports.friendListRouter.use(authorization_middleware_1.AuthorizationMiddleware.checkAuthorization);
exports.friendListRouter.use(friend_list_middleware_1.FriendListMiddleware.createIfNotExists);
exports.friendListRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.id;
    const friendList = yield friend_list_repository_1.FriendListRepository.findOne(id);
    if (friendList == null)
        return res.status(404).send(response_helper_1.ResponseHelper.error("Not found"));
    res.send(response_helper_1.ResponseHelper.success(friendList));
}));
exports.friendListRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.id;
    const status = yield friend_list_repository_1.FriendListRepository.addOne(id, req.body['id']);
    if (status != true)
        return res.status(400).send(response_helper_1.ResponseHelper.error("Failed"));
    res.send(response_helper_1.ResponseHelper.success("OK"));
}));
// friendListRouter.delete("/", async (req: Request, res: Response) => {
//     const id: string = req.query['id'].toString()
//     const friendList = await FriendListRepository.removeOne(id,)
//     if (friendList == null)
//         return res.status(400).send(ResponseHelper.error("Failed"))
//     res.send(ResponseHelper.success({ "friends": friendList.friends }))
// })
//# sourceMappingURL=friend_list.router.js.map