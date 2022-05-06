import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";


const autheticateRoutes = Router();


const authenticateUserController = new AuthenticateUserController();


autheticateRoutes.post("/sessions", authenticateUserController.handle);


export { autheticateRoutes }