import { DataSource } from "apollo-datasource";
import _ from "lodash";
import low from "lowdb";
import lodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync<{ users: Record<string, any>[] }>(
  "./server/data/users.json"
);
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

  getFavorites(sessionId: string) {
    return this.db.filter({ favorites: [`${sessionId}`] }).value();
  }

  createUser(user: Record<string, any>) {
    return this.db.insert(user).write();
  }

  getUserByEmail(email: string) {
    return this.db.find({ email }).value();
  }

  toggleFavoriteSession(sessionId: string, userId: string) {
    const favorites = this.db.getById(userId).get("favorites").value() || [];
    let newFavorites = [];

    if (favorites.includes(sessionId)) {
      newFavorites = favorites.filter((strFav: string) => strFav !== sessionId);
    } else {
      newFavorites = [...favorites, sessionId];
    }

    return this.db.getById(userId).assign({ favorites: newFavorites }).write();
  }
}

export default UserDataSource;
