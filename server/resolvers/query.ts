import { IFieldResolver } from "apollo-server";
import { ContextType } from "../types";

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
  users: async (parent, args, context, info) => {
    const users = await context.dataSources.userDataSource.getUsers(args);
    return users;
  },
  userById: async (parent, { id }, { dataSources }, info) => {
    const user = await dataSources.userDataSource.getUserById(id);
    return user;
  },
};

export default Query;
