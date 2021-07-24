import Query from "./resolvers/query";
import Mutation from "./resolvers/mutation";
import Session from "./resolvers/session";
import Speaker from "./resolvers/speaker";
import User from "./resolvers/user";
import Subscription from "./resolvers/subscription";

const resolvers = {
  Session,
  Speaker,
  User,
  Query,
  Mutation,
  Subscription,
};

export default resolvers;
