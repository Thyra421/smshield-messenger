import { Schema, Types, model } from "mongoose"

export type Message = {
    content: string
    date: Date
    from: Types.ObjectId
}

type Chat = {
    ids: Types.ObjectId[]
    messages: Message[]
}

const messageSchema = new Schema<Message>({
    content: { type: Schema.Types.String, required: true },
    date: { type: Schema.Types.Date, required: true },
    from: { type: Schema.Types.ObjectId, required: true },
})

const chatSchema = new Schema<Chat>({
    ids: { type: [Schema.Types.ObjectId], required: true },
    messages: { type: [messageSchema], required: true, default: [] }
})

export const ChatModel = model<Chat>('Chat', chatSchema);