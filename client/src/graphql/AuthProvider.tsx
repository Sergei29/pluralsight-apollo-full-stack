import React, { createContext, useState } from "react";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

type StateType = {
  userData: { email?: string; id?: string; role?: Role } | null;
};

type ContextType = {
  authInfo: StateType;
  setAuthInfo: React.Dispatch<React.SetStateAction<StateType>>;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
};

export const AuthContext = createContext<ContextType>({
  authInfo: {
    userData: null,
  },
  setAuthInfo: () => {},
  isAuthenticated: () => true,
  isAdmin: () => false,
});

const Provider = AuthContext.Provider;

const AuthProvider: React.FC = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<StateType>({
    userData: null,
  });

  const isAuthenticated = () => authInfo.userData !== null;

  const isAdmin = () => authInfo.userData?.role === Role.ADMIN;

  return (
    <Provider value={{ authInfo, setAuthInfo, isAuthenticated, isAdmin }}>
      {children}
    </Provider>
  );
};

export default AuthProvider;
