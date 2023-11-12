import { Request, Response } from "express";
import { ResponseHelper } from "../helpers/response.helper";
import { UserRepository } from "../repositories/user.repository";
import { TokenHelper } from "../helpers/token.helper";

export class AuthorizationMiddleware {
    static async checkAuthorization(req: Request, res: Response, next) {
        const token = req.headers.authorization;

        if (token == null)
            return res.status(401).json(ResponseHelper.error("Missing authorization token"));

        const email = TokenHelper.parseEmail(token);

        if (email == null)
            return res.status(406).json(ResponseHelper.error("Invalid authorization token"));

        const user = await UserRepository.findOne(email);

        if (user == null)
            return res.status(404).json(ResponseHelper.error("User not found"));

        res.locals.id = user.id;
        next();
    }
}