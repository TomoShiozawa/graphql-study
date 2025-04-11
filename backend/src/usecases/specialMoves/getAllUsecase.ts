import type { SpecialMoveModel } from "@/types/models";

export interface GetAllUsecase {
  execute: (after: Date | null) => Promise<SpecialMoveModel[]>;
}
