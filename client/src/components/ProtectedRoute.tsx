import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) { //children (profile) is the component to render if authenticated 
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/profile");
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth(); 
  }, []); //On mount, it tries to fetch /auth/profile to check if the user is logged in (no shi)
//----------If the request succeeds, it allows access to the protected route, else redirects to /login
  if (loading) return null; //or a spinner component

  if (!authenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}