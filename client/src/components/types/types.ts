import { SpeakerFullType } from "./speakers";
import { SessionFullType, SessionFullInputType } from "./sessions";
import { UserFullType } from "./users";

export type SessionType = Partial<SessionFullType>;
export type SpeakerType = Partial<SpeakerFullType>;
export type UserType = Partial<UserFullType>;
export type SessionInputType = Partial<SessionFullInputType>;

export type LevelsStateType = {
  bIntro: boolean;
  bIntermediate: boolean;
  bAdvanced: boolean;
};

export enum Levels {
  intro = "bIntro",
  intermediate = "bIntermediate",
  advanced = "bAdvanced",
}

export enum Days {
  All = "All",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
}
