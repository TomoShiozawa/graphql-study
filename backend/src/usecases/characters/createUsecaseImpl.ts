import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";
import type { CharacterRepository } from "@repositories/characterRepository";
import type { CreateUsecase } from "@usecases/characters/createUsecase";

export class CreateUsecaseImpl implements CreateUsecase {
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
