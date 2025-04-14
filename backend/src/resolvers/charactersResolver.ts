import { CharacterRepositoryImpl } from "@/repositories/characterRepositoryImpl";
import type {
  MutationResolvers,
  QueryResolvers,
} from "@/types/types.generated";
import { CreateUseCaseImpl } from "@/useCases/characters/createUseCaseImpl";
import { DeleteUseCaseImpl } from "@/useCases/characters/deleteUseCaseImpl";
import { GetAllUseCaseImpl } from "@/useCases/characters/getAllUseCaseImpl";
import { GetCountUseCaseImpl } from "@/useCases/characters/getCountUseCaseImpl";
import { UpdateUseCaseImpl } from "@/useCases/characters/updateUseCaseImpl";

export const characterQueryResolver: QueryResolvers = {
  charactersCount: async (_, __, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const getCountUseCase = new GetCountUseCaseImpl(characterRepository);
    return await getCountUseCase.execute();
  },
  allCharacters: async (_, __, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const getAllUseCase = new GetAllUseCaseImpl(characterRepository);
    return await getAllUseCase.execute();
  },
};

export const characterMutationResolver: MutationResolvers = {
  createCharacter: async (_, { input }, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const createUseCase = new CreateUseCaseImpl(characterRepository);
    return await createUseCase.execute({ input });
  },

  updateCharacter: async (_, { id, input }, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const updateUseCase = new UpdateUseCaseImpl(characterRepository);
    return await updateUseCase.execute({ id, input });
  },

  deleteCharacter: async (_, { id }, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const deleteUseCase = new DeleteUseCaseImpl(characterRepository);
    return await deleteUseCase.execute(id);
  },
};
