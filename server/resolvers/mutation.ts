import { IFieldResolver } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";

const Mutation: Record<string, IFieldResolver<any, ContextType>> = {
  toggleFavoriteSession: (parent, args, { dataSources }, info) => {
    const session = dataSources.SessionAPI.toggleFavoriteSession(args.id);
    return session;
  },
  addNewSession: (parent, args, { dataSources }, info) => {
    return dataSources.SessionAPI.addSession(args.session);
  },
  markFeatured: (parent, args, { dataSources }, info) => {
    const { speakerId, featured } = args;
    return dataSources.SpeakerAPI.markFeatured(speakerId, featured);
  },
};

export default Mutation;
