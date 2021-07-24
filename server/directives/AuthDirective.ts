import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from "apollo-server-express";
import { GraphQLField } from "graphql";
import { ContextType, Role } from "../types";

type ArgsType = Record<string, any>;

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, ContextType, ArgsType>,
    details: any
  ) {
    const { resolve } = field;
    field.resolve = async function (...args) {
      const context = args[2];
      const user = context.user;
      if (user?.role !== Role.ADMIN) {
        throw new AuthenticationError("You must be an admin.");
      }

      return resolve?.apply(this, args);
    };
  }
}

export default AuthDirective;
