import type { SpecialMoveModel } from "@/types/models";
import type { GetAllUseCase } from "@/useCases/specialMoves/getAllUseCase";
import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";

export class GetAllUseCaseImpl implements GetAllUseCase {
  constructor(private readonly specialMoveRepository: SpecialMoveRepository) {}

  public async execute(after: Date | null): Promise<SpecialMoveModel[]> {
    return await this.specialMoveRepository.getAll(after ?? undefined);
  }
}
