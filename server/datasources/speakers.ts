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

  initialize(config: Record<string, any>) {
    this.db = db;
  }

  async getSpeakerById(id: string) {
    return this.db.get("speakers").getById(id).value();
  }

  async getSpeakers(args: Record<string, any>) {
    const data = this.db.get("speakers").filter(args).value();
    return data;
  }

  // async makeSpeakerFeatured(id) {
  //   const data = await this.patch(`/${id}`, {
  //     featured: true,
  //   });
  //   return data;
  // }

  async markFeatured(speakerId: string, featured: boolean) {
    const data = this.db
      .get("speakers")
      .find({ id: speakerId })
      .assign({ featured })
      .write();
    return data;
  }
}

export default SpeakerDataSource;
