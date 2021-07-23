import { IFieldResolver } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

const Speaker: Record<string, IFieldResolver<any, ContextType>> = {
  sessions: async (speaker, args, { dataSources }, info) => {
    const sessions = await dataSources.sessionDataSource.getSessions(args);

    const returns = sessions.filter((session: Record<string, any>) => {
      return _.filter(speaker.sessions, { id: session.id }).length > 0;
    });

    return returns;
  },
  user: async (speaker, args, { dataSources }, info) => {
    const { userDataSource } = dataSources;
    if (speaker.userId) {
      return userDataSource.getUserById(speaker.userId);
    }
    return undefined;
  },
};

export default Speaker;
