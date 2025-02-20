import { DateTimeResolver } from "graphql-scalars";

import type { Resolvers } from "@/types/types.generated";
import {
  characterMutationResolver,
  characterQueryResolver,
  characterResolver,
} from "@resolvers/charactersResolver";
import {
  specialMoveMutationResolver,
  specialMoveQueryResolver,
  specialMoveResolver,
  specialMoveSubscriptionResolver,
} from "@resolvers/specialMovesResolver";

const Query = {
  ...specialMoveQueryResolver,
  ...characterQueryResolver,
};

const Mutation = {
  ...specialMoveMutationResolver,
  ...characterMutationResolver,
};

const Subscription = {
  ...specialMoveSubscriptionResolver,
};

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
  ...specialMoveResolver,
  ...characterResolver,
  DateTime: DateTimeResolver,
};
