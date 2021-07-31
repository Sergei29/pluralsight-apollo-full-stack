import { IFieldResolver } from "apollo-server";
import { ContextType, FAVORITE_UPDATES } from "../types";

type SubscriptionResolverType = Record<
  string,
  IFieldResolver<any, ContextType>
>;

const Subscription: Record<string, SubscriptionResolverType> = {
  favorites: {
    subscribe: async (parent, args, { pubsub, user }, info) => {
      if (!user) return;
      console.log("resolver, user :>> ", user);
      return pubsub.asyncIterator(FAVORITE_UPDATES);
    },
  },
};

export default Subscription;
