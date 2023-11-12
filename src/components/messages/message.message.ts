import { MessageBase } from "./base.message"

export class MessageMessage extends MessageBase {
    readonly id: string
    readonly content: string
}