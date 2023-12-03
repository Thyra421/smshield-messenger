// import { Client } from "../components/client";
// import { MessageNotificationDTO } from "../components/dtos/message_notification.dto";
// import { MessageDTO } from "../components/dtos/messenger.dto";
// import { MessageIdentify } from "../components/messages/identify.message";
// import { MessageMessage } from "../components/messages/message.message";
// import { session } from "../components/session";

// class MessageResolver {
//     private onIdentify(client: Client, identify: MessageIdentify) {
//         client.Identify(identify.id)
//     }

//     private onMessage(client: Client, message: MessageMessage) {
//         const recipent = session.Find(message.id)

//         const messageDTO: MessageDTO = { "content": message.content, "date": new Date(Date.now()), "isMine": false }

//         const response: MessageNotificationDTO = { "id": client.id, "content": messageDTO }

//         recipent?.Send(response)
//     }

//     resolve(client: Client, jsonMessage: any) {
//         const type: string = jsonMessage['type']

//         if (type === 'identify') {
//             this.onIdentify(client, jsonMessage)
//             return
//         }

//         if (client.id === null)
//             return

//         switch (type) {
//             case ("message"):
//                 this.onMessage(client, jsonMessage)
//                 break
//         }
//     }
// }

// export const messageResolver: MessageResolver = new MessageResolver()