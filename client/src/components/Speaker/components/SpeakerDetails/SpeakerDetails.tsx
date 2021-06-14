import React from "react";

const SpeakerDetails: React.FC = () => {
  /* ---> Replace hardcoded speaker values with data that you get back from GraphQL server here */
  return (
    <div key={"id"} className="col-xs-12" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{"name"}</h3>
        </div>
        <div className="panel-body">
          <h5>{"bio"}</h5>
        </div>
        <div className="panel-footer">
          {
            {
              /* ---> Loop through speaker's sessions here */
            }
          }
        </div>
      </div>
    </div>
  );
};

export default SpeakerDetails;
