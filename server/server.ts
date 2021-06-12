import { ApolloServer, ServerInfo, ApolloError } from "apollo-server";
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
  debug: false,
  formatError: (error) => {
    if (error.extensions?.code === "INTERNAL_SERVER_ERROR") {
      return new ApolloError("We have some trouble to connect", "ERROR", {
        token: "unique_token",
      });
    }
    return error;
  },
});

server.listen({ port }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
