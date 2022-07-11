import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { Router } from 'express';


const autheticateRoutes = Router();


const authenticateUserController = new AuthenticateUserController();


autheticateRoutes.post('/sessions', authenticateUserController.handle

    /* #swagger.tags = ['Authentication'] 
    #swagger.summary = 'Authentication user' 
    #swagger.description = 'Authentication user' 
    #swagger.requestBody = {   
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
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
        description: "Email or password incorrect!"
    }
    */     

);


export { autheticateRoutes }