import { gql } from "@apollo/client";

export const CREATE_SESSION = gql`
  mutation AddNewSession($session: SessionInput!) {
    addNewSession(session: $session) {
      id
      title
    }
  }
`;
