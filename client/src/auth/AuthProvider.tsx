import { useState, useEffect, type ReactNode } from "react";
import { api } from "../api"; // tu instancia de axios con withCredentials:true
import { AuthContext } from "./AuthContext";
import type { User } from "./type";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/user/login", { email, password });
    if (!res.data.success) {
      console.error("Error al iniciar sesión", res.status);
      return;
    }
    setUser(res.data.user);
    navigate("/");
  };

  const createUser = async (user: string, email: string, password: string) => {
    const res = await api.post("/user", { user, email, password });
    if (!res.data.success) {
      console.error("Error al registrar el usuario", res.status);
      return;
    }
    setUser(res.data.user);
    navigate("/");
  };

  const logout = async () => {
    const res = await api.post("/user/logout");
    if (!res.data.success) return;
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};
