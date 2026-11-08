import { useState } from "react";
import { Button } from "@/components/ui/button";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "@/hook/useAuth";
import { useLogin } from "@/hook/utilizeUser";

export default function Login() {

  const { setAuthSession } = useAuth();
  const navigate = useNavigate();

  const { loginUser,  loading, error} = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


  // Kung naka-login na, diretso admin

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await loginUser(email, password);

    if (data && data.token) {
        setAuthSession(data.token, data.user.role);

        if (data.user.role === "Admin") {
            navigate("/admin");
        } else {
            navigate("/admin/dashboard"); // Redirect to a different page for non-admin users
        }
    }
};


  // Handle Google Login via Firebase
  const handleGoogleLogin = async () => {
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl">Login</h1>
          <p className="text-sm text-muted-foreground">
            Philippine Rollball Federation
          </p>
        </div>

      
        {/* Display Error Messages */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
              placeholder="admin@rollball.ph"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* 4. Google Login Button and Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        {/*Add Google Icon */}
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <svg 
            className="mr-2 h-4 w-4" 
            viewBox="0 0 48 48" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          {loading ? "Waiting for Google ": "Login with Google"}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Doesn't have an Account? <a href="/register" className="text-primary underline hover:text-primary/90">Register Now</a>
        </p>
      </div>
    </div>
  );
}