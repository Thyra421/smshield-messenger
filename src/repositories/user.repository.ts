import { UserModel } from "../database/models/user.model";

export class UserRepository {
    static async findOne(email: string) {
        try {
            const friendList = await UserModel.findOne({ email: email });
            return friendList;
        } catch (_) {
            return null;
        }
    }

    static async findMany(filter: string) {
        try {
            const friendList = await UserModel.find({ name: { $regex: filter, $options: 'i' } });
            return friendList;
        } catch (_) {
            return null;
        }
    }
}