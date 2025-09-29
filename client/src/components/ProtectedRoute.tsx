import { Navigate } from "react-router-dom";
import { getAccessToken } from "../api/axios";

interface Props {
  children: React.ReactNode;
}

// A wrapper that checks if the user has a valid access token in memory
// If not, we redirect them to /login
export default function ProtectedRoute({ children }: Props) {
  const token = getAccessToken();

  // If no token, user is not authenticated -> redirect
  if (!token) return <Navigate to="/login" replace />;

  // Otherwise, show the protected content
  return <>{children}</>;
}
