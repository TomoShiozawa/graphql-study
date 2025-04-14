import type { SpecialMoveModel } from "@/types/models";

export interface GetAllUseCase {
  execute: (after: Date | null) => Promise<SpecialMoveModel[]>;
}
