import Query from "./resolvers/query";
import Mutation from "./resolvers/mutation";
import Session from "./resolvers/session";
import Speaker from "./resolvers/speaker";

const resolvers = {
  Session,
  Speaker,
  Query,
  Mutation,
  SessionOrError: {
    __resolveType(obj: Record<string, any>) {
      if (obj.code) {
        return "Error";
      }
      return "Session";
    },
  },
};

export default resolvers;
