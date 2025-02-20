import { createServer } from "node:http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import { PubSub } from "graphql-subscriptions";
import { useServer } from "graphql-ws/use/ws";
import { WebSocketServer } from "ws";

import { resolvers } from "@resolvers/index";

// スキーマ定義
const schema = loadSchemaSync("./src/schemas/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

// スキーマとリゾルバ設定
const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

// PubSub用意
const pubsub = new PubSub();

// HTTPサーバーの設定
const app = express();
const httpServer = createServer(app);

// WebSockerサーバーの設定
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer(
  {
    schema: schemaWithResolvers,
    context: async () => ({ pubsub }),
  },
  wsServer,
);

// ApolloServerの設定
const apolloServer = new ApolloServer({
  schema: schemaWithResolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// サーバーの起動
await apolloServer.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(apolloServer, {
    context: async () => ({ pubsub }),
  }),
);
httpServer.listen(4000, () => {
  console.log("🚀 Server ready at http://localhost:4000/graphql");
});
