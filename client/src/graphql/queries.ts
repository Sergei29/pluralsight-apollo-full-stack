import { gql } from "@apollo/client";

const SESSION_ATTRIBUTES = gql`
  fragment SessionInfo on Session {
    id
    title
    day
    room
    level
    startsAt
    speakers {
      id
      name
    }
  }
`;

export const SESSIONS = gql`
  query sessions($day: String) {
    intro: sessions(day: $day, level: "Introductory and overview") {
      ...SessionInfo
    }
    intermediate: sessions(day: $day, level: "Intermediate") {
      ...SessionInfo
    }
    advanced: sessions(day: $day, level: "Advanced") {
      ...SessionInfo
    }
  }
  ${SESSION_ATTRIBUTES}
`;

const SPEAKER_ATTRIBUTES = gql`
  fragment SpeakerInfo on Speaker {
    id
    bio
    name
    sessions {
      id
      title
    }
  }
`;

export const SPEAKERS = gql`
  query Speakers {
    speakers {
      ...SpeakerInfo
    }
  }
  ${SPEAKER_ATTRIBUTES}
`;

export const SPEAKER_BY_ID = gql`
  query SpeakerById($id: ID!) {
    speakerById(id: $id) {
      ...SpeakerInfo
    }
  }
  ${SPEAKER_ATTRIBUTES}
`;
