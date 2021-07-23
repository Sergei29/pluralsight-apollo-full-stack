import { IFieldResolver } from "apollo-server";
import { ContextType, Role } from "../types";

const Query: Record<string, IFieldResolver<any, ContextType>> = {
  sessions: (parent, args, { dataSources }, info) => {
    const allSessions = dataSources.sessionDataSource.getSessions(args);
    return allSessions;
  },
  sessionById: (parent, { id }, { dataSources }, info) => {
    const allSessions = dataSources.sessionDataSource.getSessionById(id);
    return allSessions;
  },
  speakers: async (parent, args, { dataSources }, info) => {
    const allSpeakers = await dataSources.speakerDataSource.getSpeakers(args);
    return allSpeakers;
  },
  speakerById: async (parent, { id }, { dataSources }, info) => {
    const speaker = await dataSources.speakerDataSource.getSpeakerById(id);
    return speaker;
  },
  users: async (parent, args, { dataSources, user }, info) => {
    if (!user || user.role !== Role.ADMIN) return null;
    const users = await dataSources.userDataSource.getUsers(args);
    return users;
  },
  userById: async (parent, { id }, { dataSources }, info) => {
    const user = await dataSources.userDataSource.getUserById(id);
    return user;
  },
  me: async (parent, args, { dataSources, user }, info) => {
    if (user && user.sub) {
      return dataSources.userDataSource.getUserById(user?.sub);
    }
    return undefined;
  },
};

export default Query;
