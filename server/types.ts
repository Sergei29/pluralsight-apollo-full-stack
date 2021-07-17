import express from "express";
import { JwtPayload } from "jsonwebtoken";
import SessionDataSource from "./datasources/sessions";
import SpeakerDataSource from "./datasources/speakers";
import UserDataSource from "./datasources/users";

export type TokenPayloadType = {
  email?: string;
} & JwtPayload;

export type DataSourcesType = {
  sessionDataSource: InstanceType<typeof SessionDataSource>;
  speakerDataSource: InstanceType<typeof SpeakerDataSource>;
  userDataSource: InstanceType<typeof UserDataSource>;
};

export type ContextType = {
  dataSources: DataSourcesType;
  user: null | TokenPayloadType;
  res: express.Response<any, Record<string, any>>;
};
