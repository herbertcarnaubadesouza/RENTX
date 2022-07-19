import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";
import multer from "multer";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImagesController();


const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle

    /* #swagger.tags = ['Car'] 
    #swagger.summary = 'Create Car' 
    #swagger.description = 'Create a Car' 
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
                        },
                        daily_rate: {
                            type: 'number'
                        },
                        licence_plate: {
                            type: 'string'
                        },
                        fine_amount: {
                            type: 'number'
                        },
                        brand: {
                            type: 'string'
                        },
                        category_id: {
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


carsRoutes.get(
    "/available",
    listAvailableCarsController.handle

    /* #swagger.tags = ['Car'] */
);


carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle

    /* #swagger.tags = ['Car'] 
    #swagger.summary = 'Create Car' 
    #swagger.description = 'Create a Car' 
    #swagger.requestBody = {   
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        specifications_id: {
                            type: 'array'
                        },
                    }
                    
                }
            }
        } 
    }

    #swagger.security = [{
        "bearerAuth": []
    }]

    #swagger.parameters['id'] = {
            in: 'path',
            type: 'integer',
            description: 'Specification Id.' }
        
    #swagger.responses[200] = {
        description: "Success"
    }
    #swagger.responses[400] = {
        description: "Error!"
    }
    */  
);


carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImageController.handle

    /* #swagger.tags = ['Car'] 
    #swagger.summary = 'Create Car' 
    #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['singleFile'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
              description: 'Some description...',
        } 

    #swagger.security = [{
        "bearerAuth": []
    }]

    #swagger.parameters['id'] = {
            in: 'path',
            type: 'string',
            description: 'Car Id.',
            required = 'true'
        }
        
    #swagger.responses[201] = {
        description: "Created"
    }
    */  
    
)





export { carsRoutes }