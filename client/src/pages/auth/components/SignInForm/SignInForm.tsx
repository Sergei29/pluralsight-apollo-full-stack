import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../../../../graphql/mutations";
import { AuthContext } from "../../../../graphql/AuthProvider";
import FormLayout from "../FormLayout";
import AuthForm from "../AuthForm";

const SignInForm: React.FC = () => {
  const { setAuthInfo } = useContext(AuthContext);
  const [signInUser] = useMutation(SIGN_IN);

  const handleSubmit = async (values: Record<string, any>) => {
    const response = await signInUser({ variables: values });
    const { token, user: userInfo } = response.data.signIn;
    setAuthInfo({ token, userInfo });
  };

  return (
    <FormLayout>
      <span>
        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
        <h6>
          Need an account? <Link to={`/auth/sign-up`}>Sign Up</Link>
        </h6>
      </span>
      <AuthForm onSubmit={handleSubmit}>Sign in</AuthForm>
    </FormLayout>
  );
};

export default SignInForm;
