import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { autheticateRoutes } from "./authenticate.routes";
import { rentalRoutes } from "./rental.routes";
import { passwordRoutes } from "./password.routes";


const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", userRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);
router.use(autheticateRoutes);


export { router };