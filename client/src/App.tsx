import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import AllTrips from "./pages/AllTrips";
import HowItWorks from "./pages/HowItWorks";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/all-trips",
      element: <AllTrips />,
    },
    {
      path: "how-it-works",
      element: <HowItWorks />,
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
