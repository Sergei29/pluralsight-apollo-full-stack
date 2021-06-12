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
    favorite: Boolean
    speakers: [Speaker]
  }

  input SessionInput {
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String
    favorite: Boolean
  }

  type Error {
    message: String
    code: String
    token: String
  }

  union SessionOrError = Session | Error

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

    sessionById(id: ID!): SessionOrError

    speakers: [Speaker]

    speakerById(id: ID!): Speaker
  }

  type Mutation {
    toggleFavoriteSession(id: ID!): Session
    addNewSession(session: SessionInput!): Session
  }
`;

export default typeDefs;
