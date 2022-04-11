import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../../entities/User";
import { AppError } from "../../../../errors/AppError";


interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    token: string,
    user: {
        name: string,
        email: string
    }
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        //verifica usuário
        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        //verifica senha
        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, "ecdc0b3ab9c896638e1464b75a75c7f3", {
            subject: user.id,
            expiresIn: "1d"
        });


        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;

    }

}


export { AuthenticateUserUseCase }