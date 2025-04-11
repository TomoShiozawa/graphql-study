//import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

async function main() {
  const hyakuretsu = await prisma.specialMove.create({
    data: {
      name: "北斗百裂拳",
      description:
        "北斗神拳の奥義の１つ。経絡秘孔を突くことで、体内から破壊する。",
    },
  });

  const muryokusyo = await prisma.specialMove.create({
    data: {
      name: "無量空処",
      description: "五条悟の領域展開。知覚に無限回の作業を矯正する。",
    },
  });

  const kenshiro = await prisma.character.create({
    data: {
      name: "ケンシロウ",
      description: "北斗神拳の第64代伝承者。",
      learnedSpecialMoves: {
        connect: {
          id: hyakuretsu.id,
        },
      },
    },
  });

  const gojo = await prisma.character.create({
    data: {
      name: "五条悟",
      description: "現代最強の呪術師。",
      learnedSpecialMoves: {
        connect: {
          id: muryokusyo.id,
        },
      },
    },
  });

  console.log("seed done", { hyakuretsu, muryokusyo, kenshiro, gojo });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
