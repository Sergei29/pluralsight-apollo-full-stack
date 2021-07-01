import { SpeakerFullType } from "./speakers";
import { SessionFullType } from "./sessions";

export type SessionType = Partial<SessionFullType>;
export type SpeakerType = Partial<SpeakerFullType>;
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
