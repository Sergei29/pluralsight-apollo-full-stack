import React from "react";
import { useSubscription } from "@apollo/client";
import { FAVORITES_SUBSCRIBE } from "../../graphql/subscriptions";

const FavoriteCount = () => {
  const { loading, error, data } = useSubscription(FAVORITES_SUBSCRIBE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h4>New favorite: {(!loading && data?.favorites?.sessionId) || ""}</h4>
    </div>
  );
};

export default FavoriteCount;
