import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveInput } from "@/types/types.generated";
import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";
import type { UpdateUseCase } from "@useCases/specialMoves/updateUseCase";

export class UpdateUseCaseImpl implements UpdateUseCase {
  constructor(private readonly specialMoveRepository: SpecialMoveRepository) {}

  public async execute({
    id,
    input,
  }: {
    id: string;
    input: SpecialMoveInput;
  }): Promise<SpecialMoveModel> {
    return await this.specialMoveRepository.update(id, input);
  }
}
