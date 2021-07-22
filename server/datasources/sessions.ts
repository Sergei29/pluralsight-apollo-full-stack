import { DataSource } from "apollo-datasource";
import _ from "lodash";
import low from "lowdb";
import lodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("./server/data/sessions.json");
const db = low(adapter);

db._.mixin(lodashId);

class SessionDataSource extends DataSource {
  db: any;
  constructor() {
    super();
  }

  initialize(config: Record<string, any>) {
    this.db = db.get("sessions");
  }

  getSessions(args: Record<string, any>) {
    return this.db.filter(args).value();
  }

  getSessionById(id: string) {
    return this.db.getById(id).value();
  }

  createSession(session: Record<string, any>) {
    return this.db.insert(session).write();
  }
}

export default SessionDataSource;
