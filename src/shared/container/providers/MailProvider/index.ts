import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { _SesMailProvider } from "./implementations/SesMailProvider";


const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(_SesMailProvider)
}

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
); 