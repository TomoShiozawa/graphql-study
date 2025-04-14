import type { CharacterModel } from "@/types/models";

export interface DeleteUseCase {
  execute: (id: string) => Promise<CharacterModel>;
}
