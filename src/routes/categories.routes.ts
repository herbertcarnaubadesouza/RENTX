import { Router } from "express";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController"
import multer from "multer";

import importCategoryController from "../modules/cars/useCases/importCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();


const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);


categoriesRoutes.get("/", (request, response) => {

    // #swagger.tags = ['Get categories']

    return listCategoriesController().handle(request, response);
});


categoriesRoutes.post("/import", upload.single("file"), (request, response) => {

    // #swagger.tags = ['Import']

    return importCategoryController().handle(request, response);
});


export { categoriesRoutes };