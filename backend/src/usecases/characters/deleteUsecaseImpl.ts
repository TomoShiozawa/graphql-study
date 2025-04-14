import type { CharacterRepository } from "@/repositories/characterRepository";
import type { CharacterModel } from "@/types/models";
import type { DeleteUseCase } from "@/useCases/characters/deleteUseCase";

export class DeleteUseCaseImpl implements DeleteUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(id: string): Promise<CharacterModel> {
    return await this.characterRepository.delete(id);
  }
}
