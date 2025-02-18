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
} from "@resolvers/specialMovesResolver";

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
  DateTime: DateTimeResolver,
};
