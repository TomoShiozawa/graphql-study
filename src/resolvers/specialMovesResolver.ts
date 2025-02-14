import { characters } from "@/data/charactersData";
import { specialMoves, usedBy as usedByData } from "@/data/specialMovesData";
import type {
  MutationResolvers,
  QueryResolvers,
  SpecialMove,
  SpecialMoveResolvers,
} from "@/types/types.generated";

export const specialMoveQueryResolver: QueryResolvers = {
  specialMovesCount: () => specialMoves.length,
  allSpecialMoves: (_, { after }) => {
    const records = specialMoves
      .filter((record) => (after ? record.createdAt > new Date(after) : true))
      .map((specialMove) => {
        return { ...specialMove, usedBy: getUsedBy(specialMove.id) };
      });

    return records;
  },
};

export const specialMoveMutationResolver: MutationResolvers = {
  createSpecialMove: (_, { input }) => {
    const newSpecialMove = {
      id: String(specialMoves.length + 1),
      name: input.name,
      description: input.description ?? "",
      createdAt: new Date(),
    };
    specialMoves.push(newSpecialMove);

    const newUsedBy = input.usedBy.map((characterId) => {
      return { specialMoveId: newSpecialMove.id, characterId };
    });
    usedByData.push(...newUsedBy);
    return { ...newSpecialMove, usedBy: getUsedBy(newSpecialMove.id) };
  },

  updateSpecialMove: (_, { id, input }) => {
    const targetIndex = specialMoves.findIndex(
      (specialMove) => specialMove.id === id,
    );
    if (targetIndex === -1) {
      throw new Error("SpecialMove not found");
    }
    specialMoves[targetIndex] = {
      id,
      ...input,
      description: input.description ?? "",
      createdAt: specialMoves[targetIndex].createdAt,
    };
    return { ...specialMoves[targetIndex], usedBy: getUsedBy(id) };
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

export const specialMoveResolver: SpecialMoveResolvers = {
  SpecialMove: {
    usedBy: (parent: SpecialMove) => getUsedBy(parent.id),
  },
};

const getUsedBy = (specialMoveId: string) => {
  const characterIds = usedByData
    .filter((used) => used.specialMoveId === specialMoveId)
    .map((usedBy) => usedBy.characterId);
  const usedBy = characters.filter((character) =>
    characterIds.includes(character.id),
  );
  return usedBy;
};
