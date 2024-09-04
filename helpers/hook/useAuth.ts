import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return {
    auth: context.auth,
    error: context.error,
    loading: context.loading,
    authenticated: context.authenticated,
    setAuthenticated: context.setAuthenticated,
    setAuth: context.setAuth,
    isAdd: context.isAdd,
    setIsAdd: context.setIsAdd,
  };
};

export default useAuth;