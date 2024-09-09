import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Try from "./components/Try";
import AllTrips from "./pages/AllTrips";
import HowItWorks from "./pages/HowItWorks";
import EditProfilePage from "./pages/EditProfilePage";

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
    {
      path: "edit-profile",
      element: <EditProfilePage />,
    },
    {
      path: "try",
      element: <Try />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
