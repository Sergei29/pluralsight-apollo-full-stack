import React from "react";

const SessionItem: React.FC = () => {
  /* ---> Replace hard coded session values with data that you get back from GraphQL server here */
  return (
    <div key={"id"} className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{"title"}</h3>
          <h5>{`Level: `}</h5>
        </div>
        <div className="panel-body">
          <h5>{`Day: `}</h5>
          <h5>{`Room Number: `}</h5>
          <h5>{`Starts at: `}</h5>
        </div>
        <div className="panel-footer"></div>
      </div>
    </div>
  );
};

export default SessionItem;
