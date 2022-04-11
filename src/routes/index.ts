import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";
import { autheticateRoutes } from "./authenticate.routes";


const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", userRoutes);
router.use(autheticateRoutes);


export { router };