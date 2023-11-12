import jwt from "jsonwebtoken";

export class TokenHelper {
    static parseEmail(token: string) {
        try {
            const verified: any = jwt.verify(String(token), String(process.env.JWT_SECRET));
            return verified.email;
        } catch (err) {
            return undefined;
        }
    }
}

