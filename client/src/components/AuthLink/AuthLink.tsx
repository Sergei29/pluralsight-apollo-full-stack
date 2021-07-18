import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../graphql/AuthProvider";
import { SIGN_OUT } from "../../graphql/mutations";

const AuthLink: React.FC = ({ children }) => {
  const { isAuthenticated, setAuthInfo } = useContext(AuthContext);
  const [signOutUser] = useMutation(SIGN_OUT);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setAuthInfo({ userData: null });
      history.push("/auth/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  };

  return true === isAuthenticated() ? (
    <Link onClick={handleSignOut} to="#">
      Sign Out
    </Link>
  ) : (
    <Link to="/auth/sign-in">{children}</Link>
  );
};

export default AuthLink;
