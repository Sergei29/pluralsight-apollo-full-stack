import { gql, ApolloServer, ServerInfo } from "apollo-server";
const sessions = require("./data/sessions.json");

const port = process.env.PORT || 4000;
const typeDefs = gql`
  type Session {
    id: ID!
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String
    level: String
  }
  type Query {
    sessions: [Session]
  }
`;

const resolvers = {
  Query: {
    sessions: () => sessions,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
