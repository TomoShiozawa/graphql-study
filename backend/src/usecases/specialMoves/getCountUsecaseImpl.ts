import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";
import type { GetCountUsecase } from "@usecases/specialMoves/getCountUsecase";

export class GetCountUsecaseImpl implements GetCountUsecase {
  constructor(private readonly specialMoveRepository: SpecialMoveRepository) {}

  public async execute() {
    return await this.specialMoveRepository.getCount();
  }
}
