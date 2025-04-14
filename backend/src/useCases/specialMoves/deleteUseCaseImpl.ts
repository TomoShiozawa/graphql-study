import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";
import type { DeleteUseCase } from "@useCases/specialMoves/deleteUseCase";

export class DeleteUseCaseImpl implements DeleteUseCase {
  constructor(private readonly specialMoveRepository: SpecialMoveRepository) {}

  public async execute(id: string): Promise<SpecialMoveModel> {
    return await this.specialMoveRepository.delete(id);
  }
}
