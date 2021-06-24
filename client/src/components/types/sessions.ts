import { SpeakerFullType } from "./speakers";

export type SessionFullType = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  room: string;
  day: string;
  format: string;
  level: string;
  favorite: boolean;
  speakers: Partial<SpeakerFullType>[];
};
