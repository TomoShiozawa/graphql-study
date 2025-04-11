import type { PrismaClient } from "@generated/client";
import type { PubSub } from "graphql-subscriptions";

export type Context = {
  pubsub: PubSub;
  prismaClient: PrismaClient;
};
