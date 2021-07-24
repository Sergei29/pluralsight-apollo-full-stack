import { gql } from "@apollo/client";

export const FAVORITES = gql`
  subscription Favorites {
    favorites {
      sessionId
      count
    }
  }
`;
