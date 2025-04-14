import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";
import type { GetCountUseCase } from "@useCases/specialMoves/getCountUseCase";

export class GetCountUseCaseImpl implements GetCountUseCase {
  constructor(private readonly specialMoveRepository: SpecialMoveRepository) {}

  public async execute() {
    return await this.specialMoveRepository.getCount();
  }
}
