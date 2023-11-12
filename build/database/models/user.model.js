"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.model.js.map