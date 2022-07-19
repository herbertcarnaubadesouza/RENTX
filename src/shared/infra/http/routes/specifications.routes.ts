
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

const listSpecificationsController = new ListSpecificationsController();


specificationsRoutes.post(
    "/", 
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
    /* #swagger.tags = ['Specification'] 
    #swagger.summary = 'Create Specification' 
    #swagger.description = 'Create a Specification' 
    #swagger.requestBody = {   
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        }
                    }
                    
                }
            }
        } 
    }
    
     #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[200] = {
        description: "Success"
    }
    #swagger.responses[400] = {
        description: "Error!"
    }
    */    
);

specificationsRoutes.get("/", listSpecificationsController.handle
    /* #swagger.tags = ['Specification'] */
);


export { specificationsRoutes }