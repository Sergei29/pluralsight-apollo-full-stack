import { UserType, SessionType } from "./types";

export type SpeakerFullType = {
  id: string;
  bio: string;
  name: string;
  featured: boolean;
  sessions: SessionType[];
  user: UserType;
};
