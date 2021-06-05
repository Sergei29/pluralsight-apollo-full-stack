import { gql, ApolloServer, ServerInfo, IResolvers } from "apollo-server";
import SessionAPI from "./datasources/sessions";

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
      @deprecated(reason: "the field will not be in use very soon...")
    level: String
  }
  type Query {
    sessions: [Session]
    sessionById(id: ID): Session
  }
`;

const resolvers: IResolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.SessionAPI.getSessions();
    },
    sessionById: (parent, { id }, { dataSources }, info) => {
      return dataSources.SessionAPI.getSessionById(id);
    },
  },
};

const dataSources = () => ({
  SessionAPI: new SessionAPI(),
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen({ port }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
