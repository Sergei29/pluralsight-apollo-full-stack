import { ApolloServer, ServerInfo } from "apollo-server";
import SessionDataSource from "./datasources/sessions";
import SpeakerDataSource from "./datasources/speakers";
import UserDataSource from "./datasources/users";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const port = process.env.PORT || 4000;

const dataSources = () => ({
  sessionDataSource: new SessionDataSource(),
  speakerDataSource: new SpeakerDataSource(),
  userDataSource: new UserDataSource(),
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen({ port }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
