import express, { Request, Response, Router } from "express";
import { ResponseHelper } from "../helpers/response.helper";
import { AuthorizationMiddleware } from "../middlewares/authorization.middleware";
import { UserRepository } from "../repositories/user.repository";
import { FriendListRepository } from "../repositories/friend_list.repository";
import { UserDTO } from "../components/dtos/user.dtos";
import { FriendListDTO } from "../components/dtos/friend_list.dtos";

export const userRouter: Router = express.Router();

userRouter.use(AuthorizationMiddleware.checkAuthorization);

userRouter.get("/", async (req: Request, res: Response) => {
    const id: string = res.locals.id

    const filter: string = req.query.filter?.toString()

    const users: UserDTO[] = await UserRepository.findMany(filter)
    const friendList: FriendListDTO = await FriendListRepository.findOne(id)

    const nonFriends = users.filter(user => {
        const index = friendList.friends.findIndex(f => {
            return f.id === user.id;
        })
        return index === -1;
    })

    res.send(ResponseHelper.success(nonFriends))
})