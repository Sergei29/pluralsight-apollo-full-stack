import { gql } from "@apollo/client";

export const SESSIONS = gql`
  query sessions($day: String) {
    sessions(day: $day) {
      id
      title
      day
      room
      level
      startsAt
    }
  }
`;

export const SPEAKERS = gql`
  query Speakers {
    speakers {
      id
      bio
      name
      sessions {
        id
        title
      }
    }
  }
`;
