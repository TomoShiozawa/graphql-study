import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";

export interface CreateUsecase {
  execute: ({
    input,
  }: {
    input: CharacterInput;
  }) => Promise<CharacterModel>;
}
