import { IResolvers } from "apollo-server";
import _ from "lodash";

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
  Session: {
    speakers: async (session, args, { dataSources }, info) => {
      const speakers = await dataSources.SpeakerAPI.getSpeakers();
      const returns = speakers.filter((objSpeaker: Record<string, any>) => {
        return _.filter(objSpeaker.sessions, { id: session.id }).length > 0;
      });
      return returns;
    },
  },
  Speaker: {
    sessions: async (speaker, args, { dataSources }, info) => {
      const speakerId = speaker.id;
      console.log("speakerId :>> ", speakerId);
    },
  },
};

export default resolvers;
