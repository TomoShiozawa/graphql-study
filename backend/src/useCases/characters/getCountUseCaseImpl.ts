import type { CharacterRepository } from "@repositories/characterRepository";
import type { GetCountUseCase } from "@useCases/characters/getCountUseCase";

export class GetCountUseCaseImpl implements GetCountUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(): Promise<number> {
    return await this.characterRepository.getCount();
  }
}
