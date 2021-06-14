import React, { Fragment } from "react";
import SessionForm from "../../components/SessionForm";
import "./add-session.css";

const AddSession: React.FC = () => {
  return (
    <Fragment>
      <section className="banner">
        <div className="container">
          <div className="row">
            <SessionForm />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AddSession;
