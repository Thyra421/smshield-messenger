import { Schema, Types, model } from "mongoose"

type FriendList = {
    id: Types.ObjectId
    friends: Types.ObjectId[]
}

const friendListSchema = new Schema<FriendList>({
    id: { type: Schema.Types.ObjectId, required: true },
    friends: { type: [Schema.Types.ObjectId], required: true, default: [] }
})

export const FriendListModel = model<FriendList>("FriendList", friendListSchema)