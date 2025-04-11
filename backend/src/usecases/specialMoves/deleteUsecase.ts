import type { SpecialMoveModel } from "@/types/models";

export interface DeleteUsecase {
  execute: (id: string) => Promise<SpecialMoveModel>;
}
