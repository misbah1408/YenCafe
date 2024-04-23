import { createBrowserRouter } from "react-router-dom";
import Body from "../components/Body";
import Login from "../components/Login";
import Register from "../components/Register";
import Menu from "../components/Menu";
import Home from "../components/Home";
import Cart from "../components/Cart";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Body/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>
        },
        {
          path: "/cart",
          element: <Cart/>
        }
      ],
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

export default router