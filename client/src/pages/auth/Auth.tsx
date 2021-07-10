import React, { Fragment } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
// components:
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";

const Auth: React.FC = () => {
  const { path, url } = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <Route path={`${path}/sign-in`}>
          <SignInForm />
        </Route>
        <Route path={`${path}/sign-up`}>
          <SignUpForm />
        </Route>
        <Route path={`${path}`}>
          <Redirect to={`${url}/sign-in`} />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default Auth;
