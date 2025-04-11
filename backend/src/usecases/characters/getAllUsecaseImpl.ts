import type { CharacterRepository } from "@/repositories/characterRepository";
import type { CharacterModel } from "@/types/models";
import type { GetAllUsecase } from "./getAllUsecase";

export class GetAllUsecaseImpl implements GetAllUsecase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(): Promise<CharacterModel[]> {
    return await this.characterRepository.getAll();
  }
}
