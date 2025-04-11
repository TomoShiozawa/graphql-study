import type { CharacterRepository } from "@/repositories/characterRepository";
import type { GetCountUsecase } from "./getCountUsecase";

export class GetCountUsecaseImpl implements GetCountUsecase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(): Promise<number> {
    return await this.characterRepository.getCount();
  }
}
