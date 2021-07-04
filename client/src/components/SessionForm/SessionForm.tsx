import React from "react";
import { useMutation, MutationUpdaterFn } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { CREATE_SESSION } from "../../graphql/mutations";
import { SESSIONS } from "../../graphql/queries";
import { SessionInputType } from "../types";

const SessionForm: React.FC = () => {
  /* ---> Call useMutation hook here to create new session and update cache */
  const updateSessions: MutationUpdaterFn = (cache, { data }) => {
    cache.modify({
      fields: {
        sessions: (exisitingSessions = []) => {
          const newSession = data!.addNewSession;
          cache.writeQuery({
            query: SESSIONS,
            data: { newSession, ...exisitingSessions },
          });
        },
      },
    });
  };

  const [createSession, { called, error }] = useMutation(CREATE_SESSION, {
    update: updateSessions,
  });

  if (called) return <p>Session submitted successfully.</p>;
  if (error) return <p>Failed to submit new session.</p>;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <Formik
        initialValues={
          {
            title: "",
            description: "",
            day: "",
            level: "",
          } as SessionInputType
        }
        onSubmit={async (objFormValues) => {
          /* ---> Call useMutation mutate function here to create new session */
          createSession({
            variables: { session: { ...objFormValues } },
          });
        }}
      >
        {() => (
          <Form style={{ width: "100%", maxWidth: 500 }}>
            <h3 className="h3 mb-3 font-weight-normal">Submit a Session!</h3>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputTitle">Title</label>
              <Field
                id="inputTitle"
                className="form-control"
                required
                autoFocus
                name="title"
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputDescription">Description</label>
              <Field
                type="textarea"
                id="inputDescription"
                className="form-control"
                required
                name="description"
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputDay">Day</label>
              <Field
                name="day"
                id="inputDay"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputLevel">Level</label>
              <Field
                name="level"
                id="inputLevel"
                className="form-control"
                required
              />
            </div>
            <div style={{ justifyContent: "center", alignContent: "center" }}>
              <button className="btn btn-primary">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SessionForm;
