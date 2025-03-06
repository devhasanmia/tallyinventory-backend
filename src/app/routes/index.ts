import { Router } from "express";
import { UnitRoutes } from "../modules/Unit/unit.route";
import { CategoryRoutes } from "../modules/Category/category.route";

const router = Router();

const routes = [
    {
        path: "/unit",
        route: UnitRoutes
    },
    {
        path: "/category",
        route: CategoryRoutes
    },
]

routes.forEach((element) => {
    router.use(element.path, element.route )
})

export default router