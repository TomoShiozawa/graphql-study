import type { SpecialMoveRepository } from "@/repositories/specialMoveRepository";
import type { SpecialMoveModel } from "@/types/models";
import type { DeleteUsecase } from "./deleteUsecase";

export class DeleteUsecaseImpl implements DeleteUsecase {
  constructor(private readonly specialMoveRepository: SpecialMoveRepository) {}

  public async execute(id: string): Promise<SpecialMoveModel> {
    return await this.specialMoveRepository.delete(id);
  }
}
