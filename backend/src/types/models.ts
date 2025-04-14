export type SpecialMoveModel = {
  id: string;
  name: string;
  description?: string;
  usedBy: { id: string }[];
  createdAt: Date;
};

export type CharacterModel = {
  id: string;
  name: string;
  description?: string;
  learnedSpecialMoves: { id: string }[];
  createdAt: Date;
};
