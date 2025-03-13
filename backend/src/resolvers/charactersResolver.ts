import { characters } from "@/data/charactersData";
import { specialMoves, usedBy as usedByData } from "@/data/specialMovesData";
import type {
  Character,
  CharacterResolvers,
  MutationResolvers,
  QueryResolvers,
} from "@/types/types.generated";

export const characterQueryResolver: QueryResolvers = {
  charactersCount: () => characters.length,
  allCharacters: () => {
    const records = characters.map((character) => {
      return {
        ...character,
        learnedSpecialMoves: getLernedSpecialMoves(character.id),
      };
    });
    return records;
  },
};

export const characterMutationResolver: MutationResolvers = {
  createCharacter: (_, { input }) => {
    const newCharacter = {
      id: String(characters.length + 1),
      name: input.name,
      description: input.description ?? "",
    };
    characters.push(newCharacter);

    const newUsedBy = input.learnedSpecialMoves.map((specialMoveId) => {
      return { specialMoveId, characterId: newCharacter.id };
    });
    usedByData.push(...newUsedBy);
    return {
      ...newCharacter,
      learnedSpecialMoves: getLernedSpecialMoves(newCharacter.id),
    };
  },

  updateCharacter: (_, { id, input }) => {
    const targetIndex = characters.findIndex(
      (character) => character.id === id,
    );
    if (targetIndex === -1) {
      throw new Error("Character not found");
    }
    characters[targetIndex] = {
      id,
      ...input,
      description: input.description ?? "",
    };
    return {
      ...characters[targetIndex],
      learnedSpecialMoves: getLernedSpecialMoves(id),
    };
  },

  deleteCharacter: (_, { id }) => {
    const targetIndex = characters.findIndex(
      (character) => character.id === id,
    );
    if (targetIndex === -1) {
      throw new Error("Character not found");
    }
    characters.splice(targetIndex, 1);
    usedByData.splice(
      0,
      usedByData.length,
      ...usedByData.filter((used) => used.characterId !== id),
    );
    return true;
  },
};

export const characterResolver: CharacterResolvers = {
  Character: {
    learnedSpecialMoves: (parent: Character) => {
      return getLernedSpecialMoves(parent.id);
    },
  },
};

const getLernedSpecialMoves = (characterId: string) => {
  const specialMoveIds = usedByData
    .filter((used) => used.characterId === characterId)
    .map((usedBy) => usedBy.specialMoveId);
  const learnedSpecialMoves = specialMoves.filter((specialMove) =>
    specialMoveIds.includes(specialMove.id),
  );
  return learnedSpecialMoves;
};
