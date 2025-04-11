import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";
import type { GetAllUsecase } from "@usecases/specialMoves/getAllUsecase";

export class GetAllUsecaseImpl implements GetAllUsecase {
  constructor(private readonly specialMoveRepository: SpecialMoveRepository) {}

  public async execute(after: Date): Promise<SpecialMoveModel[]> {
    return await this.specialMoveRepository.getAll(after);
  }
}
