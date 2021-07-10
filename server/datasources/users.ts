import { DataSource } from "apollo-datasource";
import _ from "lodash";
import low from "lowdb";
import lodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync";

const { groupBy } = _;

const adapter = new FileSync("./server/data/users.json");
const lowDB = low(adapter);
lowDB._.mixin(lodashId);

class UserDataSource extends DataSource {
  db: any;

  constructor() {
    super();
  }

  initialize(config: Record<string, any>) {
    this.db = lowDB.get("users");
  }

  getUsers(args: Record<string, any>) {
    return this.db.value();
  }

  getUserById(id: string) {
    return this.db.getById(id).value();
  }

  createUser(user: Record<string, any>) {
    return this.db.insert(user).write();
  }

  getUserByEmail(email: string) {
    return this.db.find({ email }).value();
  }
}

export default UserDataSource;
