import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveInput } from "@/types/types.generated";
import type { UpdateUsecase } from "@/usecases/specialMoves/updateUsecase";
import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";

export class UpdateUsecaseImpl implements UpdateUsecase {
  constructor(private readonly specialMoveRepository: SpecialMoveRepository) {}

  public async execute({
    id,
    input,
  }: { id: string; input: SpecialMoveInput }): Promise<SpecialMoveModel> {
    return await this.specialMoveRepository.update(id, input);
  }
}
