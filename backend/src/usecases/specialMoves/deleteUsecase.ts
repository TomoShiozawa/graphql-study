import type { SpecialMoveModel } from "@/types/models";

export interface DeleteUseCase {
  execute: (id: string) => Promise<SpecialMoveModel>;
}
