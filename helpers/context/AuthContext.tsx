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
  setAuth: (data: string) => void;
  isAdd: boolean;
  setIsAdd: (data: boolean) => void;
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
  const [isAdd, setIsAdd] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/v1/auth/login/auth`);
        if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
       
        setAuth(result);
        // setAuthenticated("authenticated");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if(isAdd)fetchAuth();
    fetchAuth()
  }, [isAdd]);

  return (
    <AuthContext.Provider
      value={{ auth, error, loading, authenticated, setAuthenticated ,setAuth, isAdd, setIsAdd}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;