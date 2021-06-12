import { IResolvers } from "apollo-server";
import _ from "lodash";
import Query from "./resolvers/query";
import Session from "./resolvers/session";
import Speaker from "./resolvers/speaker";

import { ContextType } from "./types";

const resolvers: IResolvers<any, ContextType> = {
  Query,
  Session,
  Speaker,
};

export default resolvers;
