import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { Router } from "express";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer";
import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));


const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle
    /* #swagger.tags = ['User'] 
    #swagger.summary = 'Create User' 
    #swagger.description = 'Create a User' 
    #swagger.requestBody = {   
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        driver_license: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        }
                    }
                    
                }
            }
        } 
    }
        
    #swagger.responses[200] = {
        description: "Success"
    }
    #swagger.responses[400] = {
        description: "Error!"
    }
    */    
);

userRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"), updateUserAvatarController.handle
    
    /* #swagger.tags = ['User'] */
    /* #swagger.security = [{'bearerAuth': []}] */

);

export { userRoutes }