import { IResolvers } from "apollo-server";

const resolvers: IResolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.SessionAPI.getSessions(args);
    },
    sessionById: (parent, { id }, { dataSources }, info) => {
      return dataSources.SessionAPI.getSessionById(id);
    },
    speakers: (parent, args, { dataSources }, info) => {
      return dataSources.SpeakerAPI.getSpeakers();
    },
    speakerById: (parent, { id }, { dataSources }, info) => {
      return dataSources.SpeakerAPI.getSpeakerById(id);
    },
  },
};

export default resolvers;
