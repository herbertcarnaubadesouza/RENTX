import { AppError } from "@errors/AppError";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"



let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let dateProvider: DayjsDateProvider;


describe("Send Forgot Mail", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    })

    it("should be able to send a forgot password mail to user", async () => {

        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "herbertcarnaubadesouza@gmail.com",
            name: "Blach Curry",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("herbertcarnaubadesouza@gmail.com")

        expect(sendMail).toHaveBeenCalled()
    })

    it("should not be able to send an email if user does not exists", async () => {

        await expect(
            sendForgotPasswordMailUseCase.execute("herb@test.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    })

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "664568",
            email: "herbertluisdesouza@gmail.com",
            name: "Herbert",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("herbertluisdesouza@gmail.com")

        expect(generateTokenMail).toBeCalled()

    })

})


