
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const roles ={
    admin: 'admin',
    user: 'user'
}


const AuthAdmin = () => {
  const { user } = useAuth(); 
  const isAdmin = user && user.role === roles.admin;

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthAdmin;