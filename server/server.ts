import { ApolloServer } from "apollo-server-express";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import SessionDataSource from "./datasources/sessions";
import SpeakerDataSource from "./datasources/speakers";
import UserDataSource from "./datasources/users";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { verifyToken } from "./utils/auth";
import { TokenPayloadType } from "./types";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
app.use(cookieParser());

const dataSources = () => ({
  sessionDataSource: new SessionDataSource(),
  speakerDataSource: new SpeakerDataSource(),
  userDataSource: new UserDataSource(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req, res }) => {
    let user: TokenPayloadType | null | string = null;

    if (req.cookies.token) {
      const userDecodedData = verifyToken(req.cookies.token);
      user = userDecodedData;
    }
    return { user, res };
  },
});

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
