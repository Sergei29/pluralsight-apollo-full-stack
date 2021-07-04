import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { SESSIONS } from "../../../../graphql/queries";
import { SessionType, LevelsStateType, Days } from "../../../types";
import SessionItem from "../../../SessionItem";

type ResponseDataType = {
  intro: SessionType[];
  intermediate: SessionType[];
  advanced: SessionType[];
};

type Props = {
  day: Days;
  objLevels: LevelsStateType;
  isDescription: boolean;
};

const SessionList: React.FC<Props> = ({ day, objLevels, isDescription }) => {
  const { loading, error, data } = useQuery<ResponseDataType>(SESSIONS, {
    variables: { day, isDescription },
  });
  const { bIntro, bIntermediate, bAdvanced } = objLevels;

  if (loading) return <p>Loading Sessions...</p>;
  if (error) return <p>Error loading sessions!</p>;
  return (
    <Fragment>
      {bIntro &&
        data?.intro?.map((objSession: SessionType) => (
          <SessionItem key={objSession.id!} objSession={objSession} />
        ))}
      {bIntermediate &&
        data?.intermediate?.map((objSession: SessionType) => (
          <SessionItem key={objSession.id!} objSession={objSession} />
        ))}

      {bAdvanced &&
        data?.advanced?.map((objSession: SessionType) => (
          <SessionItem key={objSession.id!} objSession={objSession} />
        ))}
    </Fragment>
  );
};

export default SessionList;
