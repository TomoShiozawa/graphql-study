import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/schemas/*.graphql",
  generates: {
    "src/generated/types.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
