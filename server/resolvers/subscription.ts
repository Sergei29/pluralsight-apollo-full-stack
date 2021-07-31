import { IFieldResolver, withFilter } from "apollo-server";
import { ContextType, FAVORITE_UPDATES } from "../types";

type SubscriptionResolverType = Record<
  string,
  IFieldResolver<any, ContextType>
>;

const Subscription: Record<string, SubscriptionResolverType> = {
  favorites: {
    subscribe: withFilter(
      (parent, args, { pubsub, user }, info) => {
        if (!user) return;
        console.log("resolver, user :>> ", user);
        return pubsub.asyncIterator(FAVORITE_UPDATES);
      },
      (payload, variables) => {
        if (!variables.sessionId) {
          return true;
        }

        return variables.sessionId === payload.favorites.sessionId;
      }
    ),
  },
};

export default Subscription;
