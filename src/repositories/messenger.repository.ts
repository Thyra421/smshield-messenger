import { Types } from "mongoose";
import { ChatModel, Message } from "../database/models/chat.model";
import { ChatDTO, ChatPreviewDTO, MessageDTO, MessengerDTO } from "../components/dtos/messenger.dto";
import { UserRepository } from "./user.repository";

export class MessengerRepository {
    static async exists(id: string, otherId: string): Promise<boolean> {
        try {
            const ids = [new Types.ObjectId(id), new Types.ObjectId(otherId)]
            const res = await ChatModel.exists({ ids: { $all: ids } });
            return res != null;
        } catch (_) {
            return false;
        }
    }

    static async findAll(id: string): Promise<MessengerDTO> {
        try {
            const results = await ChatModel.find({ ids: { $in: id } })

            if (results == null || results.length == 0)
                return { chats: [] };

            const validResults = results.filter(r => r.messages.length > 0)

            const chats: ChatPreviewDTO[] = await Promise.all(validResults.map(async m => {
                const otherId: string = m.ids.find(i => i.toString() != id).toString()
                const lastMessage: Message = m.messages[m.messages.length - 1]
                const other = await UserRepository.findOneById(otherId)

                const messagePreview: ChatPreviewDTO = { otherId: otherId, lastMessageContent: lastMessage.content, lastMessageDate: lastMessage.date, otherName: other.name }

                return messagePreview
            }))
            const sortedChats = chats.sort((a, b) => b.lastMessageDate.getTime() - a.lastMessageDate.getTime());
            const messenger: MessengerDTO = { chats: sortedChats }

            return messenger
        } catch (_) {
            return null;
        }
    }

    static async findOne(id: string, otherId: string): Promise<ChatDTO> {
        try {
            const ids = [new Types.ObjectId(id), new Types.ObjectId(otherId)]
            const result = await ChatModel.findOne({ ids: { $all: ids } })

            if (result == null)
                return { messages: [] };

            const messages: MessageDTO[] = result.messages.map(m => {
                const message: MessageDTO = { content: m.content, date: m.date, isMine: m.from.toString() == id }
                return message
            })
            const chat: ChatDTO = { messages: messages }

            return chat
        } catch (_) {
            return null;
        }
    }

    static async create(id: string, otherId: string) {
        try {
            const ids = [new Types.ObjectId(id), new Types.ObjectId(otherId)]

            await ChatModel.create({ ids: ids });
            return true;
        } catch (_) {
            return false;
        }
    }

    static async add(id: string, otherId: string, content: string): Promise<Message> | null {
        try {
            const ids = [new Types.ObjectId(id), new Types.ObjectId(otherId)]

            const message: Message =
                { "content": content, date: new Date(Date.now()), from: new Types.ObjectId(id) }

            const result = await ChatModel.findOneAndUpdate({ ids: { $all: ids } }, { $push: { messages: message } });

            return result != null ? message : null;
        } catch (_) {
            return null;
        }
    }
}