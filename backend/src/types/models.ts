export type SpecialMoveModel = {
  id: string;
  name: string;
  description?: string;
  usedBy: { id: string }[];
};

export type CharacterModel = {
  id: string;
  name: string;
  description?: string;
  learnedSpecialMoves: { id: string }[];
};
