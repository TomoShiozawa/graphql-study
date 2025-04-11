import type { CharacterRepository } from "@/repositories/characterRepository";
import type { CharacterModel } from "@/types/models";
import type { CharacterInput } from "@/types/types.generated";
import type { PrismaClient } from "@generated/client";

export class CharacterRepositoryImpl implements CharacterRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getCount(): Promise<number> {
    return await this.prismaClient.character.count();
  }

  async getAll(): Promise<CharacterModel[]> {
    const records = await this.prismaClient.character.findMany({
      include: {
        learnedSpecialMoves: true,
      },
    });

    return records.map((record) => ({
      ...record,
      id: record.id.toString(),
      description: record.description ?? undefined,
      learnedSpecialMoves: record.learnedSpecialMoves.map(
        (learnedSpecialMove) => ({
          ...learnedSpecialMove,
          id: learnedSpecialMove.id.toString(),
        }),
      ),
    }));
  }

  async create(input: CharacterInput): Promise<CharacterModel> {
    const record = await this.prismaClient.character.create({
      data: {
        ...input,
        learnedSpecialMoves: {
          connect: input.learnedSpecialMoves.map((learnedSpecialMoveId) => ({
            id: Number(learnedSpecialMoveId),
          })),
        },
      },
      include: {
        learnedSpecialMoves: true,
      },
    });

    return {
      id: record.id.toString(),
      name: record.name,
      description: record.description ?? undefined,
      learnedSpecialMoves: record.learnedSpecialMoves.map(
        (learnedSpecialMove) => ({
          ...learnedSpecialMove,
          id: learnedSpecialMove.id.toString(),
        }),
      ),
    };
  }

  async update(id: string, input: CharacterInput): Promise<CharacterModel> {
    const record = await this.prismaClient.character.update({
      where: { id: Number(id) },
      data: {
        ...input,
        learnedSpecialMoves: {
          connect: input.learnedSpecialMoves.map((learnedSpecialMoveId) => ({
            id: Number(learnedSpecialMoveId),
          })),
        },
      },
      include: {
        learnedSpecialMoves: true,
      },
    });

    return {
      id: record.id.toString(),
      name: record.name,
      description: record.description ?? undefined,
      learnedSpecialMoves: record.learnedSpecialMoves.map(
        (learnedSpecialMove) => ({
          ...learnedSpecialMove,
          id: learnedSpecialMove.id.toString(),
        }),
      ),
    };
  }

  async delete(id: string): Promise<CharacterModel> {
    const record = await this.prismaClient.character.delete({
      where: { id: Number(id) },
      include: {
        learnedSpecialMoves: true,
      },
    });

    return {
      id: record.id.toString(),
      name: record.name,
      description: record.description ?? undefined,
      learnedSpecialMoves: record.learnedSpecialMoves.map(
        (learnedSpecialMove) => ({
          ...learnedSpecialMove,
          id: learnedSpecialMove.id.toString(),
        }),
      ),
    };
  }
}
