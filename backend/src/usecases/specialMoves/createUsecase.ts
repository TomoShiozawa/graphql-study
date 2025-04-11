import type { SpecialMoveModel } from "@/types/models";
import type { SpecialMoveInput } from "@/types/types.generated";
import type { PubSub } from "graphql-subscriptions";

export interface CreateUsecase {
  execute: ({
    pubsub,
    input,
  }: {
    pubsub: PubSub;
    input: SpecialMoveInput;
  }) => Promise<SpecialMoveModel>;
}
