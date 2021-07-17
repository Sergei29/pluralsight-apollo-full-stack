import React, { createContext, useState } from "react";

type StateType = {
  userInfo: { email?: string; id?: string } | null;
};

type ContextType = {
  authInfo: StateType;
  setAuthInfo: React.Dispatch<React.SetStateAction<StateType>>;
  isAuthenticated: () => boolean;
};

export const AuthContext = createContext<ContextType>({
  authInfo: {
    userInfo: null,
  },
  setAuthInfo: () => {},
  isAuthenticated: () => true,
});

const Provider = AuthContext.Provider;

const AuthProvider: React.FC = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<StateType>({
    userInfo: null,
  });

  const isAuthenticated = () => authInfo.userInfo !== null;

  return (
    <Provider value={{ authInfo, setAuthInfo, isAuthenticated }}>
      {children}
    </Provider>
  );
};

export default AuthProvider;
