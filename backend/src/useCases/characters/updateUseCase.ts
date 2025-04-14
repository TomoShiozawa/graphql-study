import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";

export interface UpdateUseCase {
  execute: ({
    id,
    input,
  }: {
    id: string;
    input: CharacterInput;
  }) => Promise<CharacterModel>;
}
