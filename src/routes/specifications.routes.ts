import { Router } from "express";
import createCategoryController from "../modules/cars/useCases/createCategory";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();


specificationsRoutes.post("/", (request, response) => {

    // #swagger.tags = ['Create specifications']

    return createSpecificationController.handle(request, response);

});


export { specificationsRoutes }