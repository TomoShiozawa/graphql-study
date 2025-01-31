import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";

import { resolvers } from "@resolvers/index";

// スキーマ定義
const schema = loadSchemaSync("./src/schemas/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

// スキーマとリゾルバ設定
const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

// サーバーインスタンスの生成
const server = new ApolloServer({
  schema: schemaWithResolvers,
});

// サーバーの起動
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);
