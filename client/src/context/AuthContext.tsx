// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { baseURL } from "../utils/baseURL";
import { User } from "../@types";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean; // Add loading state
}

const authContextInitialValue: AuthContextProps = {
  user: null,
  token: null,
  login: () => {
    throw new Error("Context not defined !");
  },
  signup: () => {
    throw new Error("Context not defined !");
  },
  logout: () => {
    throw new Error("Context not defined !");
  },
  setUser: () => {
    throw new Error("Context not defined !");
  },
  loading: true, // Initial loading state is true
};

export const AuthContext = createContext<AuthContextProps>(
  authContextInitialValue
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    console.log("Saved token: ", savedToken);
    console.log("Saved user: ", savedUser);

    if (savedToken) {
      setToken(savedToken);
    }

    const getActiveUser = async () => {
      if (!savedToken) return;
      try {
        const getUser = await fetch(`${baseURL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const result = await getUser.json();
        setUser(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getActiveUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${baseURL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login response data: ", data);
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
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
