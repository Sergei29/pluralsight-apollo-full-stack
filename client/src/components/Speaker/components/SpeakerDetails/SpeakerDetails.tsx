import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SPEAKER_BY_ID } from "../../../../graphql/queries";
import { SpeakerType } from "../../../types";

type ResponseDataType = {
  speakerById: SpeakerType;
};

const SpeakerDetails: React.FC = () => {
  const { speaker_id } = useParams<{ speaker_id: string }>();
  const { loading, error, data } = useQuery<ResponseDataType>(SPEAKER_BY_ID, {
    variables: { id: speaker_id },
  });

  if (loading) return <p>Loading speaker...</p>;
  if (error) return <p>Error loading speaker!</p>;

  const { bio, name, sessions } = data?.speakerById!;
  return (
    <div className="col-xs-12" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{`Name: ${name}`}</h3>
        </div>
        <div className="panel-body">
          <h5>{`Bio: ${bio}`}</h5>
        </div>
        <div className="panel-footer">
          {/* ---> Loop through speaker's sessions here */}
          {sessions &&
            sessions.map(({ id, title }) => <p key={id!}>{title}</p>)}
        </div>
      </div>
    </div>
  );
};

export default SpeakerDetails;
