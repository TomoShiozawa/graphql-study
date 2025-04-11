import type { CharacterModel } from "@/types/models";

export interface DeleteUsecase {
  execute: (id: string) => Promise<CharacterModel>;
}
