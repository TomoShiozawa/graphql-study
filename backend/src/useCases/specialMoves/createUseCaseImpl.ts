import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveInput } from "@/types/types.generated";
import type { SpecialMoveRepository } from "@repositories/specialMoveRepository";
import type { CreateUseCase } from "@useCases/specialMoves/createUseCase";
import type { PubSub } from "graphql-subscriptions";

export class CreateUseCaseImpl implements CreateUseCase {
  constructor(
    private readonly pubsub: PubSub,
    private readonly specialMoveRepository: SpecialMoveRepository
  ) {}

  public async execute({
    input,
  }: {
    pubsub: PubSub;
    input: SpecialMoveInput;
  }): Promise<SpecialMoveModel> {
    const record = await this.specialMoveRepository.create(input);
    this.pubsub.publish("NEW_SPECIAL_MOVE", { newSpecialMove: record });
    return record;
  }
}
