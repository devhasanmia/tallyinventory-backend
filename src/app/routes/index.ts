import { Router } from "express";
import { UnitRoutes } from "../modules/Unit/unit.route";

const router = Router();

const routes = [
    {
        path: "/unit",
        route: UnitRoutes
    },
]

routes.forEach((element) => {
    router.use(element.path, element.route )
})

export default router