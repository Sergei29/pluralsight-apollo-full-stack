import React from "react";
import { Form, Formik, Field } from "formik";

export type InitialValuesType = React.FormEvent<Element> & {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (objValues: Record<string, any>) => void;
};

const AuthForm: React.FC<Props> = ({ onSubmit, children }) => (
  <Formik
    initialValues={{ email: "", password: "" } as InitialValuesType}
    onSubmit={onSubmit}
  >
    <Form className="form-signin">
      <div className="mb-3" style={{ paddingBottom: 5 }}>
        <label htmlFor="inputEmail">Email address</label>
        <Field
          name="email"
          type="email"
          id="inputEmail"
          className="form-control"
          required
          autoFocus
        />
      </div>

      <div className="mb-3" style={{ paddingBottom: 5 }}>
        <label htmlFor="inputPassword">Password</label>
        <Field
          name="password"
          type="password"
          id="inputPassword"
          className="form-control"
          required
        />
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        {children}
      </button>
    </Form>
  </Formik>
);

export default AuthForm;
