import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages";
import Layout from "@/layouts";
import Products from "@/pages/products";
import EditProducts from "@/pages/Products/editProducts";
import Login from "@/pages/Auth/login";
import AddProducts from "@/pages/Products/addProducts";
import Orders from "@/pages/orders";
import WrapIsAuthenticated from "@/hoc";

const router = createBrowserRouter([
    {
        path: "/",
        element: <WrapIsAuthenticated Page={Layout} />,
        children: [
            {
                path: "/",
                element: <WrapIsAuthenticated Page={Home} />,
            },
            {
                path: "products",
                element: <WrapIsAuthenticated Page={Products} />,
            },
            {
                path: "products/edit-products/:id",
                element: <WrapIsAuthenticated Page={EditProducts} />,
            },
            {
                path: "products/add-products",
                element: <WrapIsAuthenticated Page={AddProducts} />,
            },
            {
                path: "orders",
                element: <WrapIsAuthenticated Page={Orders} />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    }
])

export default router;