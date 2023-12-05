import { Types } from "mongoose";
import { UserDTO } from "../components/dtos/user.dto";
import { UserModel } from "../database/models/user.model";

export class UserRepository {
    static async findOne(email: string) {
        try {
            const user = await UserModel.findOne({ email: email });

            return user;
        } catch (_) {
            return null;
        }
    }

    static async findOneById(id: string) {
        try {
            const user = await UserModel.findOne({ _id: new Types.ObjectId(id) });

            return user;
        } catch (_) {
            return null;
        }
    }

    static async findMany(filter: string): Promise<UserDTO[]> {
        try {
            const result = await UserModel.aggregate([
                { $match: { name: { $regex: filter, $options: 'i' } } },
                { $project: { "name": 1, "_id": 1 } }]);

            const users: UserDTO[] = result.map(u => { return { id: u._id.toString(), name: u.name } })

            const sortedUsers: UserDTO[] = users.slice().sort((a, b) => a.name.localeCompare(b.name))

            return sortedUsers;
        } catch (_) {
            return null;
        }
    }
}