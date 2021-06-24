import React from "react";

type Props = {
  id: string;
  title: string;
  day: string;
  room: string;
  level: string;
  startsAt: string;
};

const SessionItem: React.FC<Props> = ({
  title,
  day,
  room,
  level,
  id,
  startsAt,
}) => {
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
