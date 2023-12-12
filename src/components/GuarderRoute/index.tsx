import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

export const GuardedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/acessar");
    }
  }, [isAuthenticated, navigate])
  

  return (
    <Outlet />
  );
};