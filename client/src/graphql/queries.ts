import { gql } from "@apollo/client";

export const SESSIONS = gql`
  query sessions {
    sessions {
      id
      title
      day
      room
      level
      startsAt
    }
  }
`;
