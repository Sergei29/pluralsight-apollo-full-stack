import React from "react";
import { SessionType } from "../types";

type Props = {
  objSession: SessionType;
};

const SessionItem: React.FC<Props> = ({ objSession }) => {
  const { title, day, room, level, startsAt } = objSession;
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
        <div className="panel-footer"></div>
      </div>
    </div>
  );
};

export default SessionItem;
