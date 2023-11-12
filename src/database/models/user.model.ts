import { Schema, model } from "mongoose";

interface IUser {
    email: string;
    password: string;
    name: string;
    role: "utilisateur" | "admin" | "support";
    photo: string;
    age: number;
    birthDate: string;
    phoneNumber: string;
    gender: string;
    validated: boolean;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    photo: {
        type: String,
        required: true,
        default: "default",
    },
    birthDate: { type: String, required: false, default: "" },
    phoneNumber: { type: String, required: false, default: "" },
    age: { type: Number, required: false },
    gender: { type: String, required: false, default: "autre" },
    role: { type: String, required: true, default: "utilisateur" },
    validated: { type: Boolean, required: true, default: false },
});

export const UserModel = model<IUser>("User", userSchema);