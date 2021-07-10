import { IFieldResolver, ApolloError } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";
import {
  hashPassword,
  createToken,
  verifyPassword,
  verifyToken,
} from "../utils/auth";

const errors = {
  USER_EXISTS: "User with this email already exists.",
  INCORRECT_EMAIL_PW: "Incorrect email or password.",
};

const Mutation: Record<string, IFieldResolver<any, ContextType>> = {
  createSession: async (parent, args, { dataSources }, info) => {
    const session = await dataSources.sessionDataSource.createSession(
      args.session
    );
    return session;
  },

  toggleFavoriteSession: async (parent, args, { dataSources }, info) => {
    const speaker = await dataSources.sessionDataSource.toggleFavoriteSession(
      args.id
    );
    return speaker;
  },

  markFeatured: async (parent, args, { dataSources }, info) => {
    return dataSources.speakerDataSource.markFeatured(
      args.speakerId,
      args.featured
    );
  },

  signUp: async (parent, { credentials }, { dataSources }, info) => {
    const { email, password } = credentials;
    const userCredentials = { email: email.toLowerCase(), password };

    const existingUser = dataSources.userDataSource.getUserByEmail(
      userCredentials.email
    );
    if (existingUser) {
      throw new ApolloError(errors.USER_EXISTS);
    }

    const hash = hashPassword(userCredentials.password);
    const newUser = dataSources.userDataSource.createUser({
      email: userCredentials.email,
      hash,
    });

    const token = createToken(newUser);

    return {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  },

  signIn: async (parent, { credentials }, { dataSources }, info) => {
    const { email, password } = credentials;
    const userCredentials = { email: email.toLowerCase(), password };

    const existingUser = dataSources.userDataSource.getUserByEmail(
      userCredentials.email
    );
    if (!existingUser) {
      throw new ApolloError(errors.INCORRECT_EMAIL_PW);
    }

    const isValidPassword = verifyPassword(
      userCredentials.password,
      existingUser.hash
    );
    if (!isValidPassword) {
      throw new ApolloError(errors.INCORRECT_EMAIL_PW);
    }

    const token = createToken(existingUser);

    return {
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
      },
    };
  },
};

export default Mutation;
