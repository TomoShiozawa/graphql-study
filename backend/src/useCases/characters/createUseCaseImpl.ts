import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";
import type { CharacterRepository } from "@repositories/characterRepository";
import type { CreateUseCase } from "@useCases/characters/createUseCase";

export class CreateUseCaseImpl implements CreateUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  public async execute({
    input,
  }: {
    input: CharacterInput;
  }): Promise<CharacterModel> {
    const record = await this.characterRepository.create(input);
    return record;
  }
}
