import { IFieldResolver } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

type UserType = {
  id: string;
  email: string;
  favorites: Record<string, any>[];
};

const User: Record<string, IFieldResolver<UserType, ContextType>> = {
  favorites: async (user, args, { dataSources }, info) => {
    const { userDataSource, sessionDataSource } = dataSources;
    const userFavSessionsIds: string[] =
      userDataSource.getUserById(user.id).favorites || [];

    const userFavoriteSessions = userFavSessionsIds.map((sessionId) =>
      sessionDataSource.getSessionById(sessionId)
    );

    return userFavoriteSessions;
  },
};

export default User;
