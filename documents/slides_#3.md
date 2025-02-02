---
theme: gaia
class: invert
marp: true
paginate: true

---
<style>
  .container {
    display: flex;
  }

  .col {
    flex: 1;
  }
</style>

<!--
_class: invert lead
-->
# GraphQL勉強会 #3

### ~バックエンドの実装してみる編~

---

<!--
_backgroundColor: black
_color: white
_class: lead
_paginate: false
-->

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Zen+Antique&display=swap');

section {
  font-family: "Zen Antique";
  font-size: 300px;
}

.title {
  font-size: 250px;
}

.comma {
  letter-spacing: -120px;
}

.shitemitai {
  letter-spacing: -20px;
}

.number {
  position: absolute;
  right: 130px;
  bottom: 20px;
  font-size: 100px;
  line-height: 100%;
}
</style>

<div class="title">
実装<span class="comma">、</span><span class="shitemitai">してみたい</span>
</div>
<div class="number">
第<br>
参<br>
話
</div>

---

# 今回はバックエンドの実装してみる編

- バックエンド(GraphQLサーバー)の実装をしていきます
- サンプルはリポジトリにあげてますので、細かい部分はそちらも参考にしてください
  - TODO: リポジトリのリンク
  - リポジトリこちら

---

# 使用するもの

- Apollo Server
  - <https://www.apollographql.com/docs/apollo-server>
  - GraphQLのサーバー
  - TypeScript, JavaScriptで動くよ

# 動作環境

- devcontainerを立ち上げればOKです

---

# 動作の確認

1. リポジトリのクローン
2. devcontainerの起動
3. `bun start`
4. `http://localhost:4000/` をブラウザで開くとPlayGroundが起動する

---

# とりあえずコード見てみる

`src/index.ts`を見てみます
最小限のコードでGraphQLサーバーを起動しています

必要なことは主に

- スキーマ定義の読み込み
- リゾルバの実装
- スキーマとリゾルバを設定してサーバー起動

---

# リゾルバとは？

<div class="container">
<div class="col">
スキーマはあくまでクエリやデータ型を定義するもの

対して**リゾルバ**が何かしらの実装でデータを返却する

リゾルバはスキーマのオブジェクトと
同じ名前のオブジェクトで定義する必要がある
</div>

<div class="col">

```typescript
const resolvers = {
  Query: {
    allSpecialMoves: () => specialMoves,
  },
};
```

</div>
</div>

---

# その他補足

<div class="container">
<div class="col">

`startStandaloneServer` はApollo Serverが提供している機能です

内部的にはExpressを使ってサーバー立ててるみたい

(自前でExpressを立てて、ミドルウェアとしてApollo Serverを入れることもできるらしい)

</div>

<div class="col">

```typescript
// サーバーインスタンスの生成
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// サーバーの起動
const { url } = await startStandaloneServer(
  server, { listen: { port: 4000 } });
```

</div>
</div>

---

# 簡単なクエリを追加

<div class="container">
<div class="col">

第1歩として
簡単なクエリを追加してみる

watchさせるので、編集して保存だけでOK

以降のスライドの変更は
`feature/example-commits`のブランチにコミットしています
そこからとってきてもOK
`git cherry-pick 18d313a`

</div>

<div class="col">

スキーマ追加

```typescript
type Query {
  specialMovesCount: Int!
  allSpecialMoves: [SpecialMove!]!
}
```

リゾルバも同様に追加

```typescript
const resolvers = {
  Query: {
    specialMovesCount: () => specialMoves.length,
    allSpecialMoves: () => specialMoves,
  },
};
```

</div>
</div>

---

# ソースの分割や整備

<div class="container">
<div class="col">

1つのソースに追記してくのつらくね？
はい、整備していきます

まずはスキーマを外部ファイル化して分割
`src/schema`配下に下記ファイル追加

- `schema.graphql`
- `specialMove.graphql`

</div>

<div class="col">

`index.ts`も下記のように修正

```typescript
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';

// スキーマ定義
const schema = loadSchemaSync('./src/schema/*.graphql', {
  loaders: [ new GraphQLFileLoader() ]
});

...

// スキーマとリゾルバ設定
const schemaWithResolvers = addResolversToSchema({schema, resolvers});

// サーバーインスタンスの生成
const server = new ApolloServer({
  schema: schemaWithResolvers,
});
```

</div>
</div>
