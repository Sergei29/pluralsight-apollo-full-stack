import { IFieldResolver, ApolloError } from "apollo-server";
import _ from "lodash";
import { ContextType } from "../types";
import { hashPassword, createToken, verifyPassword } from "../utils/auth";

const errors = {
  USER_EXISTS: "User with this email already exists.",
  INCORRECT_EMAIL_PW: "Incorrect email or password.",
};

const Mutation: Record<string, IFieldResolver<any, ContextType>> = {
  createSession: async (parent, args, { dataSources, user }, info) => {
    if (!user) return null;
    const session = await dataSources.sessionDataSource.createSession(
      args.session
    );
    return session;
  },

  markFeatured: async (parent, args, { dataSources }, info) => {
    return dataSources.speakerDataSource.markFeatured(
      args.speakerId,
      args.featured
    );
  },

  signUp: async (parent, { credentials }, { dataSources, res }, info) => {
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
    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 12 });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    };
  },

  signIn: async (parent, { credentials }, { dataSources, res }, info) => {
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
    /**
     * @description setting set-cookie instruction into the response header
     */
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 12,
    });

    return {
      user: {
        id: existingUser.id,
        email: existingUser.email,
      },
    };
  },

  userInfo: async (parent, args, { user }, info) => {
    if (user) {
      return {
        user: { id: user.sub, email: user.email },
      };
    }

    return { user: undefined };
  },

  signOut: async (parent, args, { res }, info) => {
    /**
     * @description setting clear-cookie instruction into the response header
     */
    res.clearCookie("token");

    return {
      user: undefined,
    };
  },

  toggleFavoriteSession: async (
    parent,
    { sessionId },
    { dataSources, user },
    info
  ) => {
    if (user) {
      const updatedUser = dataSources.userDataSource.toggleFavoriteSession(
        sessionId,
        user.sub!
      );
      return updatedUser;
    }
    return undefined;
  },
};

export default Mutation;
