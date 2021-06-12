import { ApolloServer, ServerInfo } from "apollo-server";
require("dotenv").config();
import SessionAPI from "./datasources/sessions";
import SpeakerAPI from "./datasources/speakers";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const port = process.env.PORT || 4000;

const dataSources = () => ({
  SessionAPI: new SessionAPI(),
  SpeakerAPI: new SpeakerAPI(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  engine: { graphVariant: "current" },
});

server.listen({ port }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
