
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";

type ProtectedRouteProps = {
  allowedRoles?: string[];
  children?: React.ReactNode;
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated, role, loading } = useAuth();

  // Wait while authentication is being checked.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground animate-pulse">
          Verifying credentials...
        </p>
      </div>
    );
  }

  // Redirect users who are not authenticated.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check whether the authenticated user's role is allowed.
  if (allowedRoles && !allowedRoles.includes(role ?? "")) {
    console.warn(
      `Access denied. User role '${role}' is not allowed.`,
      allowedRoles
    );

    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
