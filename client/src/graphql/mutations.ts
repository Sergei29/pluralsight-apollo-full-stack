import { gql } from "@apollo/client";
import { SPEAKER_ATTRIBUTES, SESSION_ATTRIBUTES } from "./queries";

export const CREATE_SESSION = gql`
  mutation CreateSession($session: SessionInput!) {
    createSession(session: $session) {
      ...SessionInfo
    }
  }
  ${SESSION_ATTRIBUTES}
`;

export const MARK_SPEAKER_FEATURED = gql`
  mutation markFeatured($speakerId: ID!, $featured: Boolean!) {
    markFeatured(speakerId: $speakerId, featured: $featured) {
      ...SpeakerInfo
    }
  }
  ${SPEAKER_ATTRIBUTES}
`;

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(credentials: { email: $email, password: $password }) {
      user {
        id
        email
        role
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(credentials: { email: $email, password: $password }) {
      user {
        id
        email
        role
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      user {
        id
        email
      }
    }
  }
`;

export const USER_INFO = gql`
  mutation UserInfo {
    userInfo {
      user {
        id
        email
        role
      }
    }
  }
`;

export const TOGGLE_FAVORITE_SESSION = gql`
  mutation ToggleFavoriteSession($sessionId: ID!) {
    toggleFavoriteSession(sessionId: $sessionId) {
      id
      email
      favorites {
        id
      }
    }
  }
`;
