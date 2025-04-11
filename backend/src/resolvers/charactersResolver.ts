import { CharacterRepositoryImpl } from "@/repositories/characterRepositoryImpl";
import type {
  MutationResolvers,
  QueryResolvers,
} from "@/types/types.generated";
import { CreateUsecaseImpl } from "@/usecases/characters/createUsecaseImpl";
import { DeleteUsecaseImpl } from "@/usecases/characters/deleteUsecaseImpl";
import { GetAllUsecaseImpl } from "@/usecases/characters/getAllUsecaseImpl";
import { GetCountUsecaseImpl } from "@/usecases/characters/getCountUsecaseImpl";
import { UpdateUsecaseImpl } from "@/usecases/characters/updateUsecaseImpl";

export const characterQueryResolver: QueryResolvers = {
  charactersCount: async (_, __, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const getCountUsecase = new GetCountUsecaseImpl(characterRepository);
    return await getCountUsecase.execute();
  },
  allCharacters: async (_, __, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const getAllUsecase = new GetAllUsecaseImpl(characterRepository);
    return await getAllUsecase.execute();
  },
};

export const characterMutationResolver: MutationResolvers = {
  createCharacter: async (_, { input }, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const createUsecase = new CreateUsecaseImpl(characterRepository);
    return await createUsecase.execute({ input });
  },

  updateCharacter: async (_, { id, input }, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const updateUsecase = new UpdateUsecaseImpl(characterRepository);
    return await updateUsecase.execute({ id, input });
  },

  deleteCharacter: async (_, { id }, { prismaClient }) => {
    const characterRepository = new CharacterRepositoryImpl(prismaClient);
    const deleteUsecase = new DeleteUsecaseImpl(characterRepository);
    return await deleteUsecase.execute(id);
  },
};
