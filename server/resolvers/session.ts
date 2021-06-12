import { IFieldResolver } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

const Session: Record<string, IFieldResolver<any, ContextType>> = {
  speakers: async (session, args, { dataSources }, info) => {
    const speakers = await dataSources.SpeakerAPI.getSpeakers();
    const returns = speakers.filter((objSpeaker: Record<string, any>) => {
      return _.filter(objSpeaker.sessions, { id: session.id }).length > 0;
    });
    return returns;
  },
};

export default Session;
