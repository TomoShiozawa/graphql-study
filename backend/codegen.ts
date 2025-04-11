import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/schemas/*.graphql",
  generates: {
    "src/types/types.generated.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        mappers: {
          SpecialMove: "./models#SpecialMoveModel",
          Character: "./models#CharacterModel",
        },
        contextType: "./context#Context",
        scalars: {
          DateTime: "Date",
        }
      },
    },
  },
};
export default config;
