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
