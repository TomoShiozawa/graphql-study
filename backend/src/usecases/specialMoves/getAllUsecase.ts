import type { SpecialMoveModel } from "@/types/models";

export interface GetAllUsecase {
  execute: (after: Date) => Promise<SpecialMoveModel[]>;
}
