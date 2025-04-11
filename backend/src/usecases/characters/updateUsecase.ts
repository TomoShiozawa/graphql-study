import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";

export interface UpdateUsecase {
  execute: ({
    id,
    input,
  }: {
    id: string;
    input: CharacterInput;
  }) => Promise<CharacterModel>;
}
