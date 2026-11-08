
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { registerPlayer, authService } from "@/services/userService";
import type { RegisterUser } from "@/types/user";

// ==========================================
// PLAYER REGISTRATION
// ==========================================

export const usePlayer = () => {
  const queryClient = useQueryClient();

  const registerQuery = useMutation({
    mutationFn: (user: RegisterUser) => registerPlayer(user),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      console.log("Player registered successfully:", data);
    },

    onError: (error: any) => {
      console.error("Error registering player:", error);
    },
  });

  return {
    registerPlayerAsync: registerQuery.mutateAsync,
    registerPlayer: registerQuery.mutate,
    isRegistering: registerQuery.isPending,
    error: registerQuery.error,
    isSuccess: registerQuery.isSuccess,
  };
};

// ==========================================
// EMAIL AND PASSWORD LOGIN
// ==========================================

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const authenticatedUser = await authService.login(email, password);

      return authenticatedUser;
    } catch (err: any) {
      console.error("Login failed:", err);

      const message =
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password.";

      setError(message);

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loading,
    error,
  };
};
