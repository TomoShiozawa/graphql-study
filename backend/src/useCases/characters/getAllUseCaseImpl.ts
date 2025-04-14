import type { CharacterModel } from "@/types/models";
import type { CharacterRepository } from "@repositories/characterRepository";
import type { GetAllUseCase } from "@useCases/characters/getAllUseCase";

export class GetAllUseCaseImpl implements GetAllUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(): Promise<CharacterModel[]> {
    return await this.characterRepository.getAll();
  }
}
