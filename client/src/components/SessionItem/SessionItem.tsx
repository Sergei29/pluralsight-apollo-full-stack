import React from "react";
import { Link } from "react-router-dom";
import { SessionType } from "../types";

type Props = {
  objSession: SessionType;
};

const SessionItem: React.FC<Props> = ({ objSession }) => {
  const { title, day, room, level, startsAt, speakers } = objSession;
  return (
    <div className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
          <h5>{`Level: ${level}`}</h5>
        </div>
        <div className="panel-body">
          <h5>{day}</h5>
          <h5>{`Room Number: ${room}`}</h5>
          <h5>{`Starts at: ${startsAt}`}</h5>
        </div>
        <div className="panel-footer">
          {speakers &&
            speakers.map(({ id, name }) => (
              <Link
                key={id}
                to={`/conference/speaker/${id}`}
                className="btn btn-default btn-lg"
              >
                {`View ${name}'s profile`}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SessionItem;
