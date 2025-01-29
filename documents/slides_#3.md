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
  font-size: 180px;
}

.comma {
  letter-spacing: -120px;
}

.shitemitai {
  letter-spacing: -40px;
}

.number {
  position: absolute;
  right: 130px;
  bottom: 50px;
  font-size: 100px;
  line-height: 100%;
}
</style>

<div class="title">
実装<span class="comma">、</span>してみたい
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
