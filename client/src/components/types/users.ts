import { SessionType, SpeakerType } from "./types";

export type UserFullType = {
  id: string;
  email: string;
  favorites: SessionType[];
  speaker: SpeakerType;
};
