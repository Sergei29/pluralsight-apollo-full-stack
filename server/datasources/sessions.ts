import { DataSource } from "apollo-datasource";
import _ from "lodash";
const sessions = require("../data/sessions.json");

class SessionAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config: any) {}

  getSessions() {
    return sessions;
  }

  getSessionById(id: string) {
    return _.filter(sessions, { id: parseInt(id) })[0];
  }
}

export default SessionAPI;
