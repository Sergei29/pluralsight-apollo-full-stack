import { IFieldResolver } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

const Session: Record<string, IFieldResolver<any, ContextType>> = {
  async speakers(session, args, { dataSources }) {
    const speakers = await dataSources.speakerDataSource.getSpeakers(args);

    const returns = speakers.filter((speaker: Record<string, any>) => {
      return _.filter(session.speakers, { id: speaker.id }).length > 0;
    });

    return returns;
  },
};

export default Session;
