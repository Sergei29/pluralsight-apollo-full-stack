import SessionDataSource from "./datasources/sessions";
import SpeakerDataSource from "./datasources/speakers";
import UserDataSource from "./datasources/users";

export type DataSourcesType = {
  sessionDataSource: InstanceType<typeof SessionDataSource>;
  speakerDataSource: InstanceType<typeof SpeakerDataSource>;
  userDataSource: InstanceType<typeof UserDataSource>;
};

export type ContextType = { dataSources: DataSourcesType };
