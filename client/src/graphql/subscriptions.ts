import { gql } from "@apollo/client";

export const FAVORITES_SUBSCRIBE = gql`
  subscription Favorites {
    favorites {
      sessionId
      count
    }
  }
`;
