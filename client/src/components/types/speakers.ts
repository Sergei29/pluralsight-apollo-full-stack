import { SessionFullType } from "./sessions";

export type SpeakerFullType = {
  id: string;
  bio: string;
  name: string;
  sessions: Partial<SessionFullType>[];
};
