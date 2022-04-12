import { Router } from "express";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController"
import multer from "multer";

import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle
    /* #swagger.tags = ['Category'] */
);


categoriesRoutes.get("/", listCategoriesController.handle
    /* #swagger.tags = ['Category'] */
);


categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle
    /* #swagger.tags = ['Category'] */
);


export { categoriesRoutes };