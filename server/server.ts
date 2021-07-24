import { ApolloServer } from "apollo-server-express";
import {
  createRateLimitDirective,
  createRateLimitTypeDef,
  defaultKeyGenerator,
  RateLimitKeyGenerator,
} from "graphql-rate-limit-directive";
import depthLimit from "graphql-depth-limit";
import { createComplexityLimitRule } from "graphql-validation-complexity-types";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import SessionDataSource from "./datasources/sessions";
import SpeakerDataSource from "./datasources/speakers";
import UserDataSource from "./datasources/users";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { verifyToken } from "./utils/auth";
import { TokenPayloadType, ContextType } from "./types";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
app.use(cookieParser());

const keyGenerator: RateLimitKeyGenerator<ContextType> = (
  directiveArgs,
  obj,
  args,
  ctx,
  info
) => {
  const defaultKey = defaultKeyGenerator(directiveArgs, obj, args, ctx, info);
  const key = ctx.user ? `${ctx.user.sub}:${defaultKey}` : defaultKey;
  return key;
};
const dataSources = () => ({
  sessionDataSource: new SessionDataSource(),
  speakerDataSource: new SpeakerDataSource(),
  userDataSource: new UserDataSource(),
});

const server = new ApolloServer({
  typeDefs: [createRateLimitTypeDef(), typeDefs],
  resolvers,
  dataSources,
  schemaDirectives: {
    rateLimit: createRateLimitDirective({ keyGenerator }) as any,
  },
  validationRules: [
    depthLimit(3),
    createComplexityLimitRule(600, {
      onCost: (cost) => {
        console.log("cost :>> ", cost);
      },
    }),
  ],
  context: ({ req, res }) => {
    let user: TokenPayloadType | null | string = null;
    /**
     * @description decode request cookie token to get user data, set it into context
     */
    if (req.cookies.token) {
      const userDecodedData = verifyToken(req.cookies.token);
      user = userDecodedData;
    }
    return { user, res };
  },
});

const corsOptions = { credentials: true, origin: "http://localhost:3000" };
server.applyMiddleware({ app, cors: corsOptions });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
