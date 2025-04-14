import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";

export interface CreateUseCase {
  execute: ({ input }: { input: CharacterInput }) => Promise<CharacterModel>;
}
