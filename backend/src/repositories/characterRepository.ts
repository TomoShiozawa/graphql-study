import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";

export interface CharacterRepository {
  getCount(): Promise<number>;

  getAll(): Promise<CharacterModel[]>;

  create(input: CharacterInput): Promise<CharacterModel>;

  update(id: string, input: CharacterInput): Promise<CharacterModel>;

  delete(id: string): Promise<CharacterModel>;
}
