import type { CharacterRepository } from "@/repositories/characterRepository";
import type { CharacterModel } from "@/types/models";
import type { DeleteUsecase } from "./deleteUsecase";

export class DeleteUsecaseImpl implements DeleteUsecase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(id: string): Promise<CharacterModel> {
    return await this.characterRepository.delete(id);
  }
}
