import { DateTimeResolver } from "graphql-scalars";

import type { Resolvers } from "@/types/types.generated";
import {
  characterMutationResolver,
  characterQueryResolver,
} from "@resolvers/charactersResolver";
import {
  specialMoveMutationResolver,
  specialMoveQueryResolver,
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
  DateTime: DateTimeResolver,
};
