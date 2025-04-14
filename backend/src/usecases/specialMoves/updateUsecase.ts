import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveInput } from "@/types/types.generated";

export interface UpdateUseCase {
  execute: ({
    id,
    input,
  }: {
    id: string;
    input: SpecialMoveInput;
  }) => Promise<SpecialMoveModel>;
}
