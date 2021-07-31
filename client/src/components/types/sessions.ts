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
  speakers: Partial<SpeakerFullType>[];
  favoriteCount?: number;
};

export type SessionFullInputType = {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  room: string;
  day: string;
  format: string;
  track: string;
  level: string;
};
