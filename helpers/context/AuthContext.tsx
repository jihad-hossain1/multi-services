"use client";

import React, {
  useEffect,
  useState,
  createContext,
  ReactNode,
  FC,
} from "react";

interface AuthContextType {
  auth: any;
  error: any;
  loading: boolean;
  authenticated: string;
  setAuthenticated: (data: string) => void;
}

interface IAuthContext {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthContextProvider: FC<IAuthContext> = ({ children }) => {
  const [auth, setAuth] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<string>("");

  useEffect(() => {
    const fetchAuth = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/auth/login/auth`,
          {
            cache: "no-store",
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
       
        setAuth(result);
        setAuthenticated("authenticated");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuth();
  }, []);

  useEffect(() => {
    if (auth) {
      setAuthenticated("authenticated");
    } else {
      setAuthenticated("unauthenticated");
    }
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ auth, error, loading, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;