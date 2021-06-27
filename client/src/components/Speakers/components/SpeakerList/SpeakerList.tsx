import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { SPEAKERS } from "../../../../graphql/queries";
import { SpeakerType } from "../../../types";
import SpeakerSummary from "../SpeakerSummary";

type ResponseDataType = {
  speakers: SpeakerType[];
};

const SpeakerList: React.FC = () => {
  const featured = false;

  const { loading, error, data } = useQuery<ResponseDataType>(SPEAKERS);

  if (loading) return <p>Loading Speakers...</p>;
  if (error) return <p>Error loading speakers!</p>;

  return (
    <Fragment>
      {data?.speakers.map(({ id, name, bio, sessions }) => (
        <SpeakerSummary key={id}>
          <SpeakerSummary.Header name={name!} />
          <SpeakerSummary.Bio bio={bio!} />
          <SpeakerSummary.Sessions sessions={sessions!} featured={featured} />
        </SpeakerSummary>
      ))}
    </Fragment>
  );
};

export default SpeakerList;
