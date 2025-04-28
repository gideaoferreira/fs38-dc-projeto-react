import { createBrowserRouter } from "react-router";
import homeRoutes from "./store/home/home";
import dashboardRoutes from "./dashboard/dashboard-routes";
import Login from "../views/login/Login";
import Register from "../views/register/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
  },
  homeRoutes,
  dashboardRoutes,
]);

export default router;
