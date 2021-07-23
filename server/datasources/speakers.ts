import { DataSource } from "apollo-datasource";
import _ from "lodash";
import low from "lowdb";
import lodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync";

const { groupBy } = _;

const adapter = new FileSync("./server/data/speakers.json");
const db = low(adapter);
db._.mixin(lodashId);

class SpeakerDataSource extends DataSource {
  db: any;
  constructor() {
    super();
  }

  initialize = (config: Record<string, any>) => {
    this.db = db.get("speakers");
  };

  getSpeakerById = async (id: string) => {
    return await this.db.getById(id).value();
  };

  getSpeakers = async (args: Record<string, any>) => {
    const data = await this.db.filter(args).value();
    return data;
  };

  markFeatured = async (speakerId: string, featured: boolean) => {
    const data = await this.db

      .find({ id: speakerId })
      .assign({ featured })
      .write();
    return data;
  };

  createSpeaker = async (objUser: Record<string, any>) => {
    return await this.db.insert({ userId: objUser.id }).write();
  };

  getSpeakerByUserId = async (userId: string) => {
    return await this.db.find({ userId }).value();
  };
}

export default SpeakerDataSource;
