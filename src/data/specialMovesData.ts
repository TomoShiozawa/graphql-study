export const specialMoves = [
  {
    id: "1",
    name: "北斗百裂拳",
    description:
      "北斗神拳の奥義の１つ。経絡秘孔を突くことで体の内部から爆発させる。",
    createdAt: new Date("2021-10-01T00:00:00.000Z"),
  },
  {
    id: "2",
    name: "かめはめ波",
    description: "亀仙人が編み出した技。エネルギーを両手に集中させ放出する。",
    createdAt: new Date("2021-10-01T00:00:00.000Z"),
  },
];

export const usedBy = [
  { specialMoveId: "1", characterId: "1" },
  { specialMoveId: "2", characterId: "2" },
  { specialMoveId: "1", characterId: "3" },
];
