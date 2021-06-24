import React from "react";
import { useQuery } from "@apollo/client";
import { SESSIONS } from "../../../../graphql/queries";
import { SessionType } from "../../../types";
import SessionItem from "../../../SessionItem";

type ResponseDataType = {
  sessions: SessionType[];
};

type Props = {
  day: string;
};

const SessionList: React.FC<Props> = ({ day }) => {
  const { loading, error, data } = useQuery<ResponseDataType>(SESSIONS, {
    variables: { day },
  });

  if (loading) return <p>Loading Sessions...</p>;
  if (error) return <p>Error loading sessions!</p>;
  return (
    <div>
      {data?.sessions?.map((objSession: SessionType) => (
        <SessionItem key={objSession.id!} objSession={objSession} />
      ))}
    </div>
  );
};

export default SessionList;
