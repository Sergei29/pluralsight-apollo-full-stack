import { IFieldResolver } from "apollo-server";
import { ContextType } from "../types";

const Query: Record<string, IFieldResolver<any, ContextType>> = {
  sessions: (parent, args, { dataSources }, info) => {
    return dataSources.SessionAPI.getSessions(args);
  },
  sessionById: (parent, { id }, { dataSources }, info) => {
    try {
      return dataSources.SessionAPI.getSessionById(id);
    } catch (error) {
      return {
        code: "ERROR",
        message: "An error occured.",
        token: "12332affrefsg",
      };
    }
  },
  speakers: (parent, args, { dataSources }, info) => {
    return dataSources.SpeakerAPI.getSpeakers();
  },
  speakerById: (parent, { id }, { dataSources }, info) => {
    return dataSources.SpeakerAPI.getSpeakerById(id);
  },
};

export default Query;
