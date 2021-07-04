import { RESTDataSource } from "apollo-datasource-rest";
import _ from "lodash";

class SpeakerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:5000/speakers";
  }

  async getSpeakers() {
    return await this.get("/");
  }

  async getSpeakerById(id: string) {
    return await this.get(`/${id}`);
  }

  async markFeatured(speakerId: string, featured: boolean) {
    const newSpeaker = await this.patch(`/${speakerId}`, { featured });
    return newSpeaker;
  }
}

export default SpeakerAPI;
