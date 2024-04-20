import { createBrowserRouter } from "react-router-dom";
import Body from "../components/Body";
import Login from "../components/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Body/>,
      children: [
        {
          path: "/login",
          element: <Login/>,
        },
      ],
    },
    
  ]);

export default router