import { Request, Response } from "express";
import { FriendListRepository } from "../repositories/friend_list.repository";

export class FriendListMiddleware {
    static async createIfNotExists(req: Request, res: Response, next) {
        const id = res.locals.id

        if (!await FriendListRepository.exists(id)) {
            await FriendListRepository.create(id)
        }

        next();
    }
}