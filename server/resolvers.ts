import { IResolvers } from "apollo-server";

const resolvers: IResolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.SessionAPI.getSessions(args);
    },
    sessionById: (parent, { id }, { dataSources }, info) => {
      return dataSources.SessionAPI.getSessionById(id);
    },
  },
};

export default resolvers;
