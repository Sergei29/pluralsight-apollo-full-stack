import { SessionFullType } from "./sessions";

export type SpeakerFullType = {
  id: string;
  bio: string;
  name: string;
  featured: boolean;
  sessions: Partial<SessionFullType>[];
};
