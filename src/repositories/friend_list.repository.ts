import { Aggregate, Types } from "mongoose";
import { FriendListModel } from "../database/models/friend_list.model";
import { FriendDTO, FriendListDTO } from "../components/dtos/friend_list.dtos";

export class FriendListRepository {
    static async exists(id: string) {
        try {
            const res = await FriendListModel.exists({ id: new Types.ObjectId(id) });
            return res != null;
        } catch (_) {
            return false;
        }
    }

    static async findOne(id: string): Promise<FriendListDTO> {
        try {
            const results = await FriendListModel.aggregate([
                { $match: { "id": new Types.ObjectId(id) } },
                { $lookup: { from: "users", localField: "friends", foreignField: "_id", as: "friends" } },
                { $project: { "_id": 0, "friends.name": 1, "friends._id": 1 } }
            ])

            if (results == null || results.length == 0)
                return null;

            const friends: FriendDTO[] = results[0].friends.map(f => {
                const friendDTO: FriendDTO = { id: f._id, name: f.name }
                return friendDTO
            })

            const friendList: FriendListDTO = { friends: friends }

            return friendList
        } catch (_) {
            return null;
        }
    }

    static async create(id: string) {
        try {
            await FriendListModel.create({ id: new Types.ObjectId(id) });
            return true;
        } catch (_) {
            return false;
        }
    }

    static async addOne(id: string, friendId: string) {
        try {
            await FriendListModel.updateOne(
                { id: new Types.ObjectId(id) },
                { $push: { friends: new Types.ObjectId(friendId) } }
            );
            return true;
        } catch (_) {
            return false;
        }
    }

    static async removeOne(id: string, friendId: string) {
        try {
            await FriendListModel.updateOne(
                { id: new Types.ObjectId(id) },
                { $pull: { friends: new Types.ObjectId(friendId) } }
            );
            return true;
        } catch (_) {
            return false;
        }
    }
}