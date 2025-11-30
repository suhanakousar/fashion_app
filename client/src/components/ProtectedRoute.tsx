import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { PageLoader } from "./LoadingSpinner";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/admin/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <PageLoader text="Loading..." />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
