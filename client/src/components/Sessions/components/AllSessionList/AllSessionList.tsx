import React from "react";
import { useQuery } from "@apollo/client";
import { SESSIONS } from "../../../../graphql/queries";
import SessionItem from "../../../SessionItem";
import { SessionType } from "../../../types";

const AllSessionList = () => {
  const { loading, error, data } = useQuery<Record<string, any>>(SESSIONS);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error!</p>;
  return (
    <div>
      {data?.sessions?.map((objSession: SessionType) => (
        <SessionItem
          key={objSession.id!}
          title={objSession.title!}
          level={objSession.level!}
          day={objSession.day!}
          room={objSession.room!}
          id={objSession.id!}
          startsAt={objSession.startsAt!}
        />
      ))}
    </div>
  );
};

export default AllSessionList;
