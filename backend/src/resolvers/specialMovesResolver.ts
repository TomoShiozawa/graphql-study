import { SpecialMoveRepositoryImpl } from "@/repositories/specialMoverepositoryImpl";
import type {
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolvers,
} from "@/types/types.generated";
import { CreateUseCaseImpl } from "@/useCases/specialMoves/createUseCaseImpl";
import { DeleteUseCaseImpl } from "@/useCases/specialMoves/deleteUseCaseImpl";
import { GetAllUseCaseImpl } from "@/useCases/specialMoves/getAllUseCaseImpl";
import { GetCountUseCaseImpl } from "@/useCases/specialMoves/getCountUseCaseImpl";
import { UpdateUseCaseImpl } from "@/useCases/specialMoves/updateUseCaseImpl";

export const specialMoveQueryResolver: QueryResolvers = {
  specialMovesCount: async (_, __, { prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const getCountUseCase = new GetCountUseCaseImpl(specialMoveRepository);
    return await getCountUseCase.execute();
  },
  allSpecialMoves: async (_, { after }, { prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const getAllUseCase = new GetAllUseCaseImpl(specialMoveRepository);
    return await getAllUseCase.execute(after ?? null);
  },
};

export const specialMoveMutationResolver: MutationResolvers = {
  createSpecialMove: async (_, { input }, { pubsub, prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const createUseCase = new CreateUseCaseImpl(pubsub, specialMoveRepository);
    return await createUseCase.execute({
      pubsub,
      input,
    });
  },

  updateSpecialMove: async (_, { id, input }, { prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const updateUseCase = new UpdateUseCaseImpl(specialMoveRepository);
    return await updateUseCase.execute({
      id,
      input,
    });
  },

  deleteSpecialMove: async (_, { id }, { prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const deleteUseCase = new DeleteUseCaseImpl(specialMoveRepository);
    return await deleteUseCase.execute(id);
  },
};

export const specialMoveSubscriptionResolver: SubscriptionResolvers = {
  newSpecialMove: {
    subscribe: (_, __, { pubsub }) => {
      return pubsub.asyncIterableIterator("NEW_SPECIAL_MOVE");
    },
  },
};
