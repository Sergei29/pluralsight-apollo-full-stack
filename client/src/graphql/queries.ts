import { gql } from "@apollo/client";

export const SESSION_ATTRIBUTES = gql`
  fragment SessionInfo on Session {
    id
    title
    day
    room
    level
    startsAt
    description
    speakers {
      id
      name
    }
  }
`;

export const SESSIONS = gql`
  query sessions($day: String, $isDescription: Boolean!) {
    intro: sessions(day: $day, level: "Introductory and overview") {
      ...SessionInfo
      description @include(if: $isDescription)
    }
    intermediate: sessions(day: $day, level: "Intermediate") {
      ...SessionInfo
      description @include(if: $isDescription)
    }
    advanced: sessions(day: $day, level: "Advanced") {
      ...SessionInfo
      description @include(if: $isDescription)
    }
  }
  ${SESSION_ATTRIBUTES}
`;

export const SPEAKER_ATTRIBUTES = gql`
  fragment SpeakerInfo on Speaker {
    id
    bio
    name
    featured
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
