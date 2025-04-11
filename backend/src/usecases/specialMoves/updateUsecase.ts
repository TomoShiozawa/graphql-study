import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveInput } from "@/types/types.generated";

export interface UpdateUsecase {
  execute: ({
    id,
    input,
  }: {
    id: string;
    input: SpecialMoveInput;
  }) => Promise<SpecialMoveModel>;
}
