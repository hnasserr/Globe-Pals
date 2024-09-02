// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { baseURL } from "../utils/baseURL";

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser || "{}"));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${baseURL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      throw new Error("Login failed");
    }
  };

  const signup = async (userData: any) => {
    const response = await fetch(`${baseURL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    console.log("response :>> ", response);

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      throw new Error("Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
