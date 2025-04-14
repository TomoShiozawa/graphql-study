import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";
import type { CharacterRepository } from "@repositories/characterRepository";
import type { UpdateUseCase } from "@useCases/characters/updateUseCase";

export class UpdateUseCaseImpl implements UpdateUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: CharacterInput;
  }): Promise<CharacterModel> {
    return await this.characterRepository.update(id, input);
  }
}
