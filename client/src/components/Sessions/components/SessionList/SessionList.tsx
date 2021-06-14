import React from "react";
import SessionItem from "../../../SessionItem";

type Props = {
  day: string;
};

const SessionList: React.FC<Props> = ({ day }) => {
  /* ---> Invoke useQuery hook here to retrieve sessions per day and call SessionItem */
  return <SessionItem />;
};

export default SessionList;
