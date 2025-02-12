import type { Resolvers } from "@/types/types.generated";

import {
  specialMoveMutationResolver,
  specialMoveQueryResolver,
  specialMoveResolver,
} from "@resolvers/specialMovesResolver";
import {
  characterMutationResolver,
  characterQueryResolver,
  characterResolver,
} from "./charactersResolver";

const Query = {
  ...specialMoveQueryResolver,
  ...characterQueryResolver,
};

const Mutation = {
  ...specialMoveMutationResolver,
  ...characterMutationResolver,
};

export const resolvers: Resolvers = {
  Query,
  Mutation,
  ...specialMoveResolver,
  ...characterResolver,
};
