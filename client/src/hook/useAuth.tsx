
import { createContext, useContext, useState, ReactNode } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  role: string | null;
  loading: boolean;
  setAuthSession: (token: string, userRole: string) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: null,
  loading: false,
  setAuthSession: () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("jwtToken");
  });

  const [role, setRole] = useState<string | null>(() => {
    return localStorage.getItem("userRole");
  });

  const [loading] = useState(false);

  const setAuthSession = (token: string, userRole: string) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userRole", userRole);

    setIsAuthenticated(true);
    setRole(userRole);
  };

  const signOut = async () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");

    setIsAuthenticated(false);
    setRole(null);

    console.log("User successfully logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        loading,
        setAuthSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
