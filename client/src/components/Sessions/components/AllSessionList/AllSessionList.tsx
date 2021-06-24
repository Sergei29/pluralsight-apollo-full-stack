import React from "react";
import { useQuery } from "@apollo/client";
import { SESSIONS } from "../../../../graphql/queries";
import SessionItem from "../../../SessionItem";
import { SessionType } from "../../../types";

const AllSessionList: React.FC = () => {
  const { loading, error, data } = useQuery<Record<string, any>>(SESSIONS);

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

export default AllSessionList;
