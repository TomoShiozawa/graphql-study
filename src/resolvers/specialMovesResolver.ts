import type {
  MutationResolvers,
  QueryResolvers,
  SpecialMove,
} from "@/generated/types";

const specialMoves: SpecialMove[] = [
  {
    id: "1",
    name: "北斗百裂拳",
    description:
      "北斗神拳の奥義の１つ。経絡秘孔を突くことで体の内部から爆発させる。",
  },
  {
    id: "2",
    name: "かめはめ波",
    description: "亀仙人が編み出した技。エネルギーを両手に集中させ放出する。",
  },
];

export const specialMoveQueryResolver: QueryResolvers = {
  specialMovesCount: () => specialMoves.length,
  allSpecialMoves: () => specialMoves,
};

export const specialMoveMutationResolver: MutationResolvers = {
  createSpecialMove: (_, { input }) => {
    const newSpecialMove = { ...input, id: String(specialMoves.length + 1) };
    specialMoves.push(newSpecialMove);
    return newSpecialMove;
  },
  updateSpecialMove: (_, { id, input }) => {
    const targetIndex = specialMoves.findIndex(
      (specialMove) => specialMove.id === id,
    );
    if (targetIndex === -1) {
      throw new Error("SpecialMove not found");
    }
    specialMoves[targetIndex] = { id, ...input };
    return specialMoves[targetIndex];
  },
  deleteSpecialMove: (_, { id }) => {
    const targetIndex = specialMoves.findIndex(
      (specialMove) => specialMove.id === id,
    );
    if (targetIndex === -1) {
      throw new Error("SpecialMove not found");
    }
    specialMoves.splice(targetIndex, 1);
    return true;
  },
};
