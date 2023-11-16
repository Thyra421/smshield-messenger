import { NextFunction, Request, Response } from "express";
import { MessengerRepository } from "../repositories/messenger.repository";

export class MessengerMiddleware {
    static async createIfNotExists(req: Request, res: Response, next: NextFunction) {
        const id = res.locals.id
        const otherId = req.params.id

        if (!await MessengerRepository.exists(id, otherId)) {
            await MessengerRepository.create(id, otherId)
        }

        next();
    }
}