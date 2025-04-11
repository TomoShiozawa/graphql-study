import type { CharacterModel } from "@/types/models";

export interface GetAllUsecase {
  execute: (after: Date) => Promise<CharacterModel[]>;
}
