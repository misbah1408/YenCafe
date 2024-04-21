import { createBrowserRouter } from "react-router-dom";
import Body from "../components/Body";
import Login from "../components/Login";
import Register from "../components/Register";
import About from "../components/About";
import Home from "../components/Home";

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
          path: "/about",
          element: <About/>
        },
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