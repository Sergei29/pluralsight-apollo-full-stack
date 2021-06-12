import SessionAPI from "./datasources/sessions";
import SpeakerAPI from "./datasources/speakers";

export type DataSourcesType = {
  SessionAPI: InstanceType<typeof SessionAPI>;
  SpeakerAPI: InstanceType<typeof SpeakerAPI>;
};

export type ContextType = { dataSources: DataSourcesType };
