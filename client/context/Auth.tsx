"use client";

import { UserCredential, AuthContextType } from "@/types";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<UserCredential>({
    token: "",
    user: {
      userId: 0,
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setAuthState({ token: token || "", user});
  }, []);

  const setUserAuthInfo = (data: UserCredential) => {
    const userData = {
      token: data.token || authState.token,
      user: data.user || authState.user,
    };

    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));

    setAuthState(userData);
  };

  const isUserAuthenticated = () => {
    return !!authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        setUserAuthInfo,
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuth };