import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type ProtectedRoutePropsType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutePropsType) => {
  const { user } = useContext(AuthContext);

  const isUserLoggedin = user ? true : false;

  return <>{isUserLoggedin ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
