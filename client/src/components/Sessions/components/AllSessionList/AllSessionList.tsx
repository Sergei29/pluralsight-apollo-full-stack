import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { SESSIONS } from "../../../../graphql/queries";
import SessionItem from "../../../SessionItem";
import { SessionType, LevelsStateType } from "../../../types";

type ResponseDataType = {
  intro: SessionType[];
  intermediate: SessionType[];
  advanced: SessionType[];
};

type Props = {
  objLevels: LevelsStateType;
  isDescription: boolean;
};

const AllSessionList: React.FC<Props> = ({ objLevels, isDescription }) => {
  const { loading, error, data } = useQuery<ResponseDataType>(SESSIONS, {
    variables: { isDescription },
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

export default AllSessionList;
