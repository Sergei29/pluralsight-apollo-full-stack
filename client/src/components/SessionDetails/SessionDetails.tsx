import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { SESSION_BY_ID } from "../../graphql/queries";
import { SessionType, UserType } from "../types";
import SessionItem from "../SessionItem";
import "../SessionItem/session-item.css";

const SessionDetails = () => {
  const { session_id } = useParams<{ session_id: string }>();
  const { loading, error, data } = useQuery<{
    session: SessionType;
    user: UserType;
  }>(SESSION_BY_ID, { variables: { id: session_id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error !</p>;

  const { session, user } = data!;
  if (!session) return <p>no session</p>;
  const bFavorite =
    user.favorites!.findIndex((objFav) => objFav.id === session.id) > -1;

  return <SessionItem objSession={session} favorite={bFavorite} />;
};

export default SessionDetails;
