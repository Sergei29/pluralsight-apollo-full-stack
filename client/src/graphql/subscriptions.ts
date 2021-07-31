import { gql } from "@apollo/client";

export const FAVORITES_SUBSCRIBE = gql`
  subscription Favorites($sessionId: ID) {
    favorites(sessionId: $sessionId) {
      sessionId
      count
    }
  }
`;
