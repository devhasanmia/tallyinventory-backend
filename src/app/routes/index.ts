import { Router } from "express";
import { UnitRoutes } from "../modules/Unit/unit.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { ExpensesRoutes } from "../modules/Expenses/expenses.route";
import { CustomerRoutes } from "../modules/Customer/customer.route";
import { SalesRoutes } from "../modules/Sales/customer.route";

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
    {
        path: "/product",
        route: ProductRoutes
    },
    {
        path: "/expenses",
        route: ExpensesRoutes
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