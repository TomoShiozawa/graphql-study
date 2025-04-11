import { SpecialMoveRepositoryImpl } from "@/repositories/specialMoverepositoryImpl";
import type {
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolvers,
} from "@/types/types.generated";
import { CreateUsecaseImpl } from "@/usecases/specialMoves/createUsecaseImpl";
import { DeleteUsecaseImpl } from "@/usecases/specialMoves/deleteUsecaseImpl";
import { GetAllUsecaseImpl } from "@/usecases/specialMoves/getAllUsecaseImpl";
import { GetCountUsecaseImpl } from "@/usecases/specialMoves/getCountUsecaseImpl";
import { UpdateUsecaseImpl } from "@/usecases/specialMoves/updateUsecaseImpl";

export const specialMoveQueryResolver: QueryResolvers = {
  specialMovesCount: async (_, __, { prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const getCountUsecase = new GetCountUsecaseImpl(specialMoveRepository);
    return await getCountUsecase.execute();
  },
  allSpecialMoves: async (_, { after }, { prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const getAllUsecase = new GetAllUsecaseImpl(specialMoveRepository);
    return await getAllUsecase.execute(after ?? null);
  },
};

export const specialMoveMutationResolver: MutationResolvers = {
  createSpecialMove: async (_, { input }, { pubsub, prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const createUsecase = new CreateUsecaseImpl(pubsub, specialMoveRepository);
    return await createUsecase.execute({
      pubsub,
      input,
    });
  },

  updateSpecialMove: async (_, { id, input }, { prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const updateUsecase = new UpdateUsecaseImpl(specialMoveRepository);
    return await updateUsecase.execute({
      id,
      input,
    });
  },

  deleteSpecialMove: async (_, { id }, { prismaClient }) => {
    const specialMoveRepository = new SpecialMoveRepositoryImpl(prismaClient);
    const deleteUsecase = new DeleteUsecaseImpl(specialMoveRepository);
    return await deleteUsecase.execute(id);
  },
};

export const specialMoveSubscriptionResolver: SubscriptionResolvers = {
  newSpecialMove: {
    subscribe: (_, __, { pubsub }) => {
      return pubsub.asyncIterableIterator("NEW_SPECIAL_MOVE");
    },
  },
};
