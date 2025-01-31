const specialMoves = [
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

export const specialMoveQueryResolver = {
  specialMovesCount: () => specialMoves.length,
  allSpecialMoves: () => specialMoves,
};
