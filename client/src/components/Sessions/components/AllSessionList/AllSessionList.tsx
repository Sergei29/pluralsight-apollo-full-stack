import React, { Fragment, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SESSIONS } from "../../../../graphql/queries";
import { FAVORITES_SUBSCRIBE } from "../../../../graphql/subscriptions";
import SessionItem from "../../../SessionItem";
import { SessionType, LevelsStateType, UserType } from "../../../types";

type ResponseDataType = {
  intro: SessionType[];
  intermediate: SessionType[];
  advanced: SessionType[];
  user: UserType;
};

type Props = {
  objLevels: LevelsStateType;
  isDescription: boolean;
};

const AllSessionList: React.FC<Props> = ({ objLevels, isDescription }) => {
  const { loading, error, data, subscribeToMore } =
    useQuery<Record<string, any>>(SESSIONS, {
      variables: { isDescription },
    }) || {};

  const { bIntro, bIntermediate, bAdvanced } = objLevels;

  const arrFavorites =
    data?.user?.favorites?.map(
      (objSession: Record<string, any>) => objSession.id
    ) || [];

  /**
   * @description effect to run subscription
   * @returns {undefined}
   */
  useEffect(() => {
    if (!data?.intro) return;

    const unsubscribe = subscribeToMore({
      document: FAVORITES_SUBSCRIBE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { count, sessionId } = subscriptionData.data?.favorites || {};
        const funcIterator = (objSession: Record<string, any>) =>
          objSession.id === sessionId
            ? { ...objSession, favoriteCount: count }
            : objSession;

        return {
          ...prev,
          advanced: prev.advanced.map(funcIterator),
          intermediate: prev.intermediate.map(funcIterator),
          intro: prev.intro.map(funcIterator),
        };
      },
    });

    /**
     * @description cleanup on unmount
     * @returns {undefined}
     */
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  if (loading) return <p>Loading Sessions...</p>;
  if (error) return <p>Error loading sessions!</p>;
  return (
    <Fragment>
      {bIntro &&
        data?.intro?.map((objSession: SessionType) => (
          <SessionItem
            key={objSession.id!}
            objSession={objSession}
            favorite={arrFavorites.includes(objSession.id!)}
          />
        ))}
      {bIntermediate &&
        data?.intermediate?.map((objSession: SessionType) => (
          <SessionItem
            key={objSession.id!}
            objSession={objSession}
            favorite={arrFavorites.includes(objSession.id!)}
          />
        ))}

      {bAdvanced &&
        data?.advanced?.map((objSession: SessionType) => (
          <SessionItem
            key={objSession.id!}
            objSession={objSession}
            favorite={arrFavorites.includes(objSession.id!)}
          />
        ))}
    </Fragment>
  );
};

export default AllSessionList;
