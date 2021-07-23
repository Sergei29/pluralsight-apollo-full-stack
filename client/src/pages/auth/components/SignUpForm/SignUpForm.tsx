import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../../../graphql/mutations";
import { USERS } from "../../../../graphql/queries";
import { AuthContext } from "../../../../graphql/AuthProvider";
import FormLayout from "../FormLayout";
import AuthForm from "../AuthForm";

const SignUpForm = () => {
  const { setAuthInfo } = useContext(AuthContext);
  const [signUpUser] = useMutation(SIGN_UP);

  const handleSubmit = async (values: Record<string, any>) => {
    const response = await signUpUser({
      variables: values,
      refetchQueries: [{ query: USERS }],
    });
    const { user: userData } = response.data.signUp;
    setAuthInfo({ userData });
  };

  return (
    <FormLayout>
      <span>
        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
        <h6>
          Already have an account? <Link to={`/auth/sign-in`}>Sign In</Link>
        </h6>
      </span>
      <AuthForm onSubmit={handleSubmit}>Sign up</AuthForm>
    </FormLayout>
  );
};

export default SignUpForm;
