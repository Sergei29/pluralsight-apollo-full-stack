import { IFieldResolver } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

const Speaker: Record<string, IFieldResolver<any, ContextType>> = {
  sessions: async (speaker, args, { dataSources }, info) => {
    const sessions = await dataSources.SessionAPI.getSessions(args);
    const returns = sessions.filter((objSession: Record<string, any>) => {
      return _.filter(objSession.speakers, { id: speaker.id });
    });
    return returns;
  },
};

export default Speaker;
