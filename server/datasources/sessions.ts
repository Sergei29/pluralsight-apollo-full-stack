import { DataSource } from "apollo-datasource";
import _ from "lodash";
const sessions = require("../data/sessions.json");

class SessionAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config: any) {}

  getSessions(args: Record<string, any>) {
    return _.filter(sessions, args);
  }

  getSessionById(id: string) {
    return _.filter(sessions, { id: parseInt(id) })[0];
  }
}

export default SessionAPI;