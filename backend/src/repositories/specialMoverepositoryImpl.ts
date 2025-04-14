import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveInput } from "@/types/types.generated";
import type { PrismaClient } from "@generated/client";
import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";

export class SpecialMoveRepositoryImpl implements SpecialMoveRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async getCount(): Promise<number> {
    return this.prismaClient.specialMove.count();
  }

  public async getAll(after?: Date): Promise<SpecialMoveModel[]> {
    const records = await this.prismaClient.specialMove.findMany({
      where: { createdAt: { gt: after } },
      include: {
        usedBy: true,
      },
    });

    return records.map((record) => ({
      ...record,
      id: record.id.toString(),
      description: record.description ?? undefined,
      usedBy: record.usedBy.map((usedBy) => ({
        ...usedBy,
        id: usedBy.id.toString(),
      })),
    }));
  }

  public async create(input: SpecialMoveInput): Promise<SpecialMoveModel> {
    const record = await this.prismaClient.specialMove.create({
      data: {
        name: input.name,
        description: input.description,
        usedBy: {
          connect: input.usedBy.map((usedById) => ({
            id: Number(usedById),
          })),
        },
      },
      include: {
        usedBy: true,
      },
    });

    return {
      ...record,
      id: record.id.toString(),
      description: record.description ?? undefined,
      usedBy: record.usedBy.map((usedBy) => ({
        ...usedBy,
        id: usedBy.id.toString(),
      })),
    };
  }

  public async update(
    id: string,
    input: SpecialMoveInput,
  ): Promise<SpecialMoveModel> {
    const record = await this.prismaClient.specialMove.update({
      where: { id: Number(id) },
      data: {
        ...input,
        usedBy: {
          connect: input.usedBy.map((usedById) => ({
            id: Number(usedById),
          })),
        },
      },
      include: {
        usedBy: true,
      },
    });

    return {
      ...record,
      id: record.id.toString(),
      description: record.description ?? undefined,
      usedBy: record.usedBy.map((usedBy) => ({
        ...usedBy,
        id: usedBy.id.toString(),
      })),
    };
  }

  public async delete(id: string): Promise<SpecialMoveModel> {
    const record = await this.prismaClient.specialMove.delete({
      where: { id: Number(id) },
      include: {
        usedBy: true,
      },
    });

    return {
      ...record,
      id: record.id.toString(),
      description: record.description ?? undefined,
      usedBy: record.usedBy.map((usedBy) => ({
        ...usedBy,
        id: usedBy.id.toString(),
      })),
    };
  }
}
