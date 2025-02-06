import type { Resolvers } from "@/generated/types";

import { specialMoveQueryResolver } from "@resolvers/specialMovesResolver";

const Query = {
  ...specialMoveQueryResolver,
};

export const resolvers: Resolvers = {
  Query,
};
