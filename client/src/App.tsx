
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import VerifyQr from "./pages/VerifyQr";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./hook/useAuth";
import AdminLayout from "./components/AdminLayout";

import { GenerateQR } from "./pages/admintab/GenerateQr";
import Member from "./pages/admintab/Member";
import Admin from "./pages/admintab/Dashboard";
import Events from "./pages/admintab/Events";
import { Gallery } from "./pages/admintab/Gallery";
import News from "./pages/admintab/News";
import Settings from "./pages/admintab/Setting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyQr />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/members" element={<Member />} />
                <Route path="/admin/events" element={<Events />} />
                <Route path="/admin/generate-qr" element={<GenerateQR />} />
                <Route path="/admin/gallery" element={<Gallery />} />
                <Route path="/admin/news" element={<News />} />
                <Route path="/admin/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
