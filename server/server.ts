import { ApolloServer, ServerInfo } from "apollo-server";
import SessionAPI from "./datasources/sessions";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const port = process.env.PORT || 4000;

const dataSources = () => ({
  SessionAPI: new SessionAPI(),
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen({ port }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
