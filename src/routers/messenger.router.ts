import express, { Request, Response, Router } from "express";
import { ResponseHelper } from "../helpers/response.helper";
import { AuthorizationMiddleware } from "../middlewares/authorization.middleware";
import { ChatDTO, MessengerDTO } from "../components/dtos/messenger.dto";
import { MessengerRepository } from "../repositories/messenger.repository";
import { MessengerMiddleware } from "../middlewares/messenger.middleware";

export const messengerRouter: Router = express.Router();

messengerRouter.use(AuthorizationMiddleware.checkAuthorization);

messengerRouter.get("/", async (req: Request, res: Response) => {
    const id: string = res.locals.id

    const messenger: MessengerDTO = await MessengerRepository.findAll(id)

    res.send(ResponseHelper.success(messenger))
})

messengerRouter.get("/chat/:id", MessengerMiddleware.createIfNotExists, async (req: Request, res: Response) => {
    const id: string = res.locals.id
    const otherId = req.params.id;

    const chat: ChatDTO = await MessengerRepository.findOne(id, otherId)

    res.send(ResponseHelper.success(chat))
})

// messengerRouter.get("/populate/:id", MessengerMiddleware.createIfNotExists, async (req: Request, res: Response) => {
//     const id: string = res.locals.id
//     const otherId = req.params.id;

//     const status = await MessengerRepository.add(id, otherId)

//     if (status)
//         res.send(ResponseHelper.success("ok"))
//     else
//         res.status(400).send(ResponseHelper.error("ko"))
// })