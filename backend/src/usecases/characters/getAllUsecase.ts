import type { CharacterModel } from "@/types/models";

export interface GetAllUseCase {
  execute: (after: Date) => Promise<CharacterModel[]>;
}
