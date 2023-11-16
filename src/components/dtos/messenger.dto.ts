export type MessageDTO = {
    content: string
    date: Date
    isMine: boolean
}

export type ChatDTO = {
    messages: MessageDTO[]
}

export type ChatPreviewDTO = {
    lastMessageContent: string
    lastMessageDate: Date
    otherName: string
    otherId: string
}

export type MessengerDTO = {
    chats: ChatPreviewDTO[]
}