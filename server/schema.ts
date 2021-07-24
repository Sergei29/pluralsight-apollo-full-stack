import { gql } from "apollo-server";

const typeDefs = gql`
  directive @requiresAdmin on FIELD_DEFINITION
  directive @cost(value: Int) on FIELD_DEFINITION
  enum Role {
    ADMIN
    USER
  }

  input SessionInput {
    title: String!
    description: String
    format: String
    level: String
    day: String
  }

  type Speaker {
    id: ID!
    bio: String
    name: String
    featured: Boolean
    sessions: [Session]
    user: User
  }

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
      @deprecated(
        reason: "Too many sessions do not fit into a single track, we will be migrating to a tags based system in the future..."
      )
    level: String
    speakers: [Speaker]
    favoriteCount: Int
  }

  type Query @rateLimit(limit: 5, duration: 10) {
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
    speakerById(id: ID): Speaker
    users: [User] @requiresAdmin
    userById(id: ID): User
    me: User
  }

  type User {
    id: String!
    email: String!
    favorites: [Session!]
    role: Role
    speaker: Speaker
  }

  input Credentials {
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User
  }

  type FavoriteCount {
    sessionId: ID
    count: Int
  }

  type Mutation {
    createSession(session: SessionInput): Session
    toggleFavoriteSession(sessionId: ID!): User
    signUp(credentials: Credentials!): AuthPayload
    signIn(credentials: Credentials!): AuthPayload
    markFeatured(speakerId: ID!, featured: Boolean!): Speaker
    userInfo: AuthPayload
    signOut: AuthPayload
  }

  type Subscription {
    favorites: FavoriteCount
  }
`;

export default typeDefs;
