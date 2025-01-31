import { specialMoveQueryResolver } from "@resolvers/specialMovesResolver";

const Query = {
  ...specialMoveQueryResolver,
};

export const resolvers = {
  Query,
};
