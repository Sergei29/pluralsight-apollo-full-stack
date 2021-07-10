import { IFieldResolver } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

const Mutation: Record<string, IFieldResolver<any, ContextType>> = {
  createSession: async (parent, args, { dataSources }, info) => {
    const session = await dataSources.sessionDataSource.createSession(
      args.session
    );
    return session;
  },

  toggleFavoriteSession: async (parent, args, { dataSources }, info) => {
    const speaker = await dataSources.sessionDataSource.toggleFavoriteSession(
      args.id
    );
    return speaker;
  },

  markFeatured: async (parent, args, { dataSources }, info) => {
    return dataSources.speakerDataSource.markFeatured(
      args.speakerId,
      args.featured
    );
  },
};

export default Mutation;
