import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveInput } from "@/types/types.generated";

export interface SpecialMoveRepository {
  getCount(): Promise<number>;

  getAll(after: Date): Promise<SpecialMoveModel[]>;

  create(input: SpecialMoveInput): Promise<SpecialMoveModel>;

  update(id: string, input: SpecialMoveInput): Promise<SpecialMoveModel>;

  delete(id: string): Promise<SpecialMoveModel>;
}
