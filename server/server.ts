import { gql, ApolloServer, ServerInfo } from "apollo-server";

const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL World!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
