import { RESTDataSource } from "apollo-datasource-rest";
import _ from "lodash";

class SpeakerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:5000/speakers";
  }

  async getSpeakers() {
    throw new Error("");
    return await this.get("/");
  }

  async getSpeakerById(id: string) {
    return await this.get(`/${id}`);
  }
}

export default SpeakerAPI;
