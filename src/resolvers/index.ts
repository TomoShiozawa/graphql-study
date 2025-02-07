import type { Resolvers } from "@/generated/types";

import {
  specialMoveMutationResolver,
  specialMoveQueryResolver,
} from "@resolvers/specialMovesResolver";

const Query = {
  ...specialMoveQueryResolver,
};

const Mutation = {
  ...specialMoveMutationResolver,
};

export const resolvers: Resolvers = {
  Query,
  Mutation,
};
