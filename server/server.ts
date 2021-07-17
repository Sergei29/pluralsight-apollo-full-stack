import { ApolloServer, ServerInfo } from "apollo-server";
import dotenv from "dotenv";
import SessionDataSource from "./datasources/sessions";
import SpeakerDataSource from "./datasources/speakers";
import UserDataSource from "./datasources/users";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { verifyToken } from "./utils/auth";
import { TokenPayloadType } from "./types";

dotenv.config();

const port = process.env.PORT || 4000;

const dataSources = () => ({
  sessionDataSource: new SessionDataSource(),
  speakerDataSource: new SpeakerDataSource(),
  userDataSource: new UserDataSource(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    let user: TokenPayloadType | null | string = null;

    if (req.headers.authorization) {
      const userDecodedData = verifyToken(req.headers.authorization);
      user = userDecodedData;
    }
    return { user };
  },
});

server.listen({ port }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
