import React, { createContext, useState } from "react";

type StateType = {
  token: null | string;
  userInfo: { email?: string; id?: string };
};

type ContextType = {
  authInfo: StateType;
  setAuthInfo: React.Dispatch<React.SetStateAction<StateType>>;
  isAuthenticated: () => boolean;
};

export const AuthContext = createContext<ContextType>({
  authInfo: {
    token: null,
    userInfo: {},
  },
  setAuthInfo: () => {},
  isAuthenticated: () => true,
});

const Provider = AuthContext.Provider;

const AuthProvider: React.FC = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<StateType>({
    token: null,
    userInfo: {},
  });

  const isAuthenticated = () => authInfo.token !== null;

  return (
    <Provider value={{ authInfo, setAuthInfo, isAuthenticated }}>
      {children}
    </Provider>
  );
};

export default AuthProvider;
