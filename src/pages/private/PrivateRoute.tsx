// components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
