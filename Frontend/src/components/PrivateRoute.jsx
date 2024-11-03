/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export const PrivateRoute = ({ children }) =>{
    const { token, loading } = useAuth();
  
    if (loading) return <Loader />;
    return token ? <>{children}</> : <Navigate to="/login" />;
  }