import { gql } from "apollo-server";

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
    speakers: [Speaker]
  }

  type Speaker {
    id: ID!
    bio: String
    name: String
    sessions: [Session]
  }

  type Query {
    sessions(
      id: ID
      title: String
      description: String
      startsAt: String
      endsAt: String
      room: String
      day: String
      format: String
      track: String
      level: String
    ): [Session]

    sessionById(id: ID): Session

    speakers: [Speaker]

    speakerById(id: ID!): Speaker
  }
`;

export default typeDefs;
