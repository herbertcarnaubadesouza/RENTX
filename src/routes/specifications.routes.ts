
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);

// #swagger.tags = ['List Users']
specificationsRoutes.get("/", listSpecificationsController.handle);


export { specificationsRoutes }