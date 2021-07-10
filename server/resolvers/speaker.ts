import { IFieldResolver } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

const Speaker: Record<string, IFieldResolver<any, ContextType>> = {
  async sessions(speaker, args, { dataSources }) {
    const sessions = await dataSources.sessionDataSource.getSessions(args);

    const returns = sessions.filter((session: Record<string, any>) => {
      return _.filter(speaker.sessions, { id: session.id }).length > 0;
    });

    return returns;
  },
};

export default Speaker;
