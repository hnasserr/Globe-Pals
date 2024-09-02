import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "signUp",
      element: <Signup />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
