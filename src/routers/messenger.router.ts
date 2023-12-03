import express, { Request, Response, Router } from "express";
import { ResponseHelper } from "../helpers/response.helper";
import { AuthorizationMiddleware } from "../middlewares/authorization.middleware";
import { ChatDTO, MessageDTO, MessengerDTO } from "../components/dtos/messenger.dto";
import { MessengerRepository } from "../repositories/messenger.repository";
import { MessengerMiddleware } from "../middlewares/messenger.middleware";
import { Client } from "../components/client";
import { session } from "../components/session";
import { MessageNotificationDTO } from "../components/dtos/message_notification.dto";
import { Message } from "../database/models/chat.model";

export const messengerRouter: Router = express.Router();

messengerRouter.use(AuthorizationMiddleware.checkAuthorization);

messengerRouter.get("/", async (req: Request, res: Response) => {
    const id: string = res.locals.id

    const messenger: MessengerDTO = await MessengerRepository.findAll(id)

    res.send(ResponseHelper.success(messenger))
})

messengerRouter.post("/chat/:id", MessengerMiddleware.createIfNotExists, async (req: Request, res: Response) => {
    const id: string = res.locals.id
    const otherId: string = req.params.id;
    const content: string = req.body.content

    const message: Message = await MessengerRepository.add(id, otherId, content)

    if (message == null)
        return res.status(400).send(ResponseHelper.error("Failed"))

    const otherClient: Client = session.Find(otherId)

    if (otherClient != undefined) {
        const messageDTO: MessageDTO = { content: message.content, date: message.date, isMine: false }
        const notification: MessageNotificationDTO = { content: messageDTO, id: id }

        otherClient.Send(notification);
    }

    res.send(ResponseHelper.success("OK"))
})


messengerRouter.get("/chat/:id", MessengerMiddleware.createIfNotExists, async (req: Request, res: Response) => {
    const id: string = res.locals.id
    const otherId = req.params.id;

    const chat: ChatDTO = await MessengerRepository.findOne(id, otherId)

    res.send(ResponseHelper.success(chat))
})