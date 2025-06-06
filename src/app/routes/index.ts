import { Router } from "express";
import { UnitRoutes } from "../modules/Unit/unit.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { CustomerRoutes } from "../modules/Customer/customer.route";
import { SalesRoutes } from "../modules/Sales/customer.route";
import { UserRoutes } from "../modules/User/user.route";

const router = Router();

const routes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/unit",
        route: UnitRoutes
    },
    {
        path: "/category",
        route: CategoryRoutes
    },
    {
        path: "/product",
        route: ProductRoutes
    },
    {
        path: "/customer",
        route: CustomerRoutes
    },
    {
        path: "/sales",
        route: SalesRoutes
    }
]

routes.forEach((element) => {
    router.use(element.path, element.route )
})

export default router