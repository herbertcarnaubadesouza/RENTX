import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {


    interface IPayload {
        sub: string
    }

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {

        //desustrurando o token
        const { sub: user_id } = verify(token, "ecdc0b3ab9c896638e1464b75a75c7f3") as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        next();

    } catch {
        throw new AppError("Invalid token!", 401);
    }
}