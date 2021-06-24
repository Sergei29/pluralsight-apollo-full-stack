import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import AllSessionList from "./components/AllSessionList";
import SessionList from "./components/SessionList";
import "./style-sessions.css";

/* ---> Define queries, mutations and fragments here */

const Sessions: React.FC = () => {
  const [day, setDay] = useState("All");
  return (
    <Fragment>
      <section className="banner">
        <div className="container">
          <div className="row" style={{ padding: 10 }}>
            <Link
              className="btn btn-lg center-block"
              to={`/conference/sessions/new`}
            >
              Submit a Session!
            </Link>
          </div>
          <div className="row">
            <button
              type="button"
              onClick={() => setDay("All")}
              className="btn-oval"
            >
              All Sessions
            </button>
            <button
              type="button"
              onClick={() => setDay("Wednesday")}
              className="btn-oval"
            >
              Wednesday
            </button>
            <button
              type="button"
              onClick={() => setDay("Thursday")}
              className="btn-oval"
            >
              Thursday
            </button>
            <button
              type="button"
              onClick={() => setDay("Friday")}
              className="btn-oval"
            >
              Friday
            </button>
          </div>
          {day !== "All" ? <SessionList day={day} /> : <AllSessionList />}
        </div>
      </section>
    </Fragment>
  );
};

export default Sessions;
