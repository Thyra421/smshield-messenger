import { Schema, Types, model } from "mongoose"

interface IFriendList {
    id: Types.ObjectId
    friends: Types.ObjectId[]
}

const friendListSchema = new Schema<IFriendList>({
    id: { type: Schema.Types.ObjectId, required: true },
    friends: { type: [Schema.Types.ObjectId], required: true, default: [] }
})

export const FriendListModel = model<IFriendList>("FriendList", friendListSchema)