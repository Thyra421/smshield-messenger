import express, { Request, Response, Router } from "express";
import { FriendListRepository } from "../repositories/friend_list.repository";
import { ResponseHelper } from "../helpers/response.helper";
import { AuthorizationMiddleware } from "../middlewares/authorization.middleware";
import { FriendListMiddleware } from "../middlewares/friend_list.middleware";

export const friendListRouter: Router = express.Router();

friendListRouter.use(AuthorizationMiddleware.checkAuthorization);
friendListRouter.use(FriendListMiddleware.createIfNotExists);

friendListRouter.get("/", async (req: Request, res: Response) => {
    const id: string = res.locals.id

    const friendList = await FriendListRepository.findOne(id)

    if (friendList == null)
        return res.status(404).send(ResponseHelper.error("Not found"))

    res.send(ResponseHelper.success(friendList))
})

friendListRouter.post("/", async (req: Request, res: Response) => {
    const id: string = res.locals.id
    const friendID: string = req.body['id']

    const status = await FriendListRepository.addOne(id, friendID)

    if (status != true)
        return res.status(400).send(ResponseHelper.error("Failed"))

    res.send(ResponseHelper.success("OK"))
})

friendListRouter.delete("/", async (req: Request, res: Response) => {
    const id: string = res.locals.id
    const friendID: string = req.body['id']

    const friendList = await FriendListRepository.removeOne(id, friendID)

    if (friendList == null)
        return res.status(400).send(ResponseHelper.error("Failed"))

        res.send(ResponseHelper.success("OK"))

})