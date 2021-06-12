import { IFieldResolver, ApolloError } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

const Session: Record<string, IFieldResolver<any, ContextType>> = {
  speakers: async (session, args, { dataSources }, info) => {
    try {
      const speakers = await dataSources.SpeakerAPI.getSpeakers();
      const returns = speakers.filter((objSpeaker: Record<string, any>) => {
        return _.filter(objSpeaker.sessions, { id: session.id }).length > 0;
      });
      return returns;
    } catch (error) {
      return new ApolloError("Unable to get speakers.", "ERROR", {
        token: "session_speakers",
      });
    }
  },
};

export default Session;
