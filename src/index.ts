import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";

// スキーマ定義
const schema = loadSchemaSync("./src/schema/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const specialMoves = [
  {
    id: "1",
    name: "北斗百裂拳",
    description:
      "北斗神拳の奥義の１つ。経絡秘孔を突くことで体の内部から爆発させる。",
  },
  {
    id: "2",
    name: "かめはめ波",
    description: "亀仙人が編み出した技。エネルギーを両手に集中させ放出する。",
  },
];

// リゾルバ
const resolvers = {
  Query: {
    specialMovesCount: () => specialMoves.length,
    allSpecialMoves: () => specialMoves,
  },
};

// スキーマとリゾルバ設定
const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

// サーバーインスタンスの生成
const server = new ApolloServer({
  schema: schemaWithResolvers,
});

// サーバーの起動
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);
