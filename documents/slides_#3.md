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
`src/schemas`配下に下記ファイル追加

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
const schema = loadSchemaSync('./src/schemas/*.graphql', {
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

---

# ソースの分割や整備

<div class="container">
<div class="col">

`src/schemas/schema.graphql`

```graphql
schema {
  query: Query
}

```

</div>
<div class="col">

`src/schemas/specialMove.graphql`

```graphql
type SpecialMove {
  id: ID!
  name: String!
  description: String
}

type Query {
  specialMovesCount: Int!
  allSpecialMoves: [SpecialMove!]!
}
```

</div>
</div>

---

# ソースの分割や整備

<div class="container">
<div class="col">
リゾルバも整備しやすいように変更

`src/resolvers`配下に下記ファイル追加

- `index.ts`
- `specialMovesResolver.ts`

`tsconfig.config`もパスエイリアスを追加
 (これはオプションなのでよしなに)
</div>
<div class="col">

```json
  "paths": {
    "@/*": [
      "./src/*"
    ],
    "@resolvers/*": [
      "./src/resolvers/*"
    ],
  }
```

</div>
</div>

---

# ソースの分割や整備

<div class="container">
<div class="col">

`src/resolvers/index.ts`

```typescript
import { specialMoveQueryResolver }
  from "@resolvers/specialMovesResolver";

const Query = {
  ...specialMoveQueryResolver,
};

export const resolvers = {
  Query,
};
```

</div>
<div class="col">

`src/resolvers/specialMovesResolver.ts`

```typescript
const specialMoves = [
  ...
];

export const specialMoveQueryResolver = {
  specialMovesCount: () => specialMoves.length,
  allSpecialMoves: () => specialMoves,
};
```

</div>
</div>

---

# リゾルバの型について

<div class="container">
<div class="col">

リゾルバをスキーマに準拠して実装しないといけない...
TypeScript用の型定義あった方が良くね？

[Codegen](https://the-guild.dev/graphql/codegen/docs/getting-started#to-the-backend)を使って
スキーマからリゾルバー型定義を生成します

</div>
<div class="col">

コマンド準備してあります

```bash
bun codegen

# もちろんwatchモードもご用意させていただきました
bun codegen-watch
```

スキーマを読んでリゾルバ用の型定義を
`src/generated/types.d.ts`に出力してくれます

</div>
</div>

---

# リゾルバの型について

<div class="container">
<div class="col">

リゾルバに型定義を追加

`src/resolvers/index.ts`

```typescript
import type { Resolvers } from "@/generated/types";

export const resolvers: Resolvers = {
  ...
}
```

</div>
<div class="col">

`src/resolvers/specialMovesResolver.ts`

```typescript
import type { QueryResolvers } from "@/generated/types";

export const specialMoveQueryResolver: QueryResolvers = {
  ...
}
```

</div>
</div>

---

# Codegenについて補足

今回は説明のしやすさのため
リゾルバはあらかじめ作っておいて、型定義だけ使うようにしました

やろうと思えばサーバプリセットを使って、
型定義だけでなく各リゾルバーのガワや、
個々のスキーマをマージしたものも生成できます

[参考こちら](https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga-with-server-preset)

---

# ミューテーション追加する

<div class="container">
<div class="col">

では改めてミューテーション追加してみる
必殺技の追加を例にします

やることは

- スキーマ更新
- ミューテーションのリゾルバ実装

まずはスキーマ更新します

</div>
<div class="col">

`src/schemas/specialMove.graphql`

```graphql
input SpecialMoveInput {
  name: String!
  description: String
}

type Mutation {
  createSpecialMove(input: SpecialMoveInput!): SpecialMove!
}
```

`src/schemas/schema.graphql`

```graphql
schema {
  query: Query
  mutation: Mutation
}
```

</div>
</div>

---

# ミューテーション追加する

型定義を更新
`bun codegen`

`createSpecialMove`の実装

`src/resolvers/specialMovesResolver.ts`

```typescript
export const specialMoveMutationResolver: MutationResolvers = {
  createSpecialMove: (_, { input }) => {
    const newSpecialMove = { ...input, id: String(specialMoves.length + 1) };
    specialMoves.push(newSpecialMove);
    return newSpecialMove;
  },
};
```

---

# ミューテーション追加する

<div class="container">
<div class="col">

ルート型のMutationを追加する

</div>
<div class="col">

`src/resolvers/index.ts`

```typescript
const Mutation = {
  ...specialMoveMutationResolver,
};

export const resolvers: Resolvers = {
  Query,
  Mutation,
};
```

</div>
</div>

---

# ミューテーション追加する

ちょっと補足

```typescript
createSpecialMove: (_, { input }) => {
```

第1引数は親オブジェクトへの参照
第2引数がリゾルバの引数

ミューテーション引数に`input`という名前で定義したので、
`input`というキー名で入力ちが渡ってきます

親オブジェクトの参照は使わないので`_`にしてます

---

# ミューテーション追加する

更新・削除も追加してみる

スキーマ更新

```graphql
type Mutation {
  createSpecialMove(input: SpecialMoveInput!): SpecialMove!
  updateSpecialMove(id: ID!, input: SpecialMoveInput!): SpecialMove!
  deleteSpecialMove(id: ID!): Boolean!
}
```

処理対象が指定できるように
引数に`id`を追加
(ついでにコメントも追記しとこ)

---

# ミューテーション追加する

実装はよしなに
(そろそろコード載せきれなくなったのでスライド切れちゃってごめんなさい)

```typescript
updateSpecialMove: (_, { id, input }) => {
  const targetIndex = specialMoves.findIndex(
    (specialMove) => specialMove.id === id,
  );
  if (targetIndex === -1) {
    throw new Error("SpecialMove not found");
  }
  specialMoves[targetIndex] = { id, ...input };
  return specialMoves[targetIndex];
},
deleteSpecialMove: (_, { id }) => {
  const targetIndex = specialMoves.findIndex(
    (specialMove) => specialMove.id === id,
  );
  if (targetIndex === -1) {
    throw new Error("SpecialMove not found");
  }
  specialMoves.splice(targetIndex, 1);
  return true;
},
```

---

# 関係性の追加

<div class="container">
<div class="col">

必殺技を使うキャラクターの情報も追加するよ

`src/schemas/specialMove.graphql`
に利用キャラクターのフィールドを追加

</div>
<div class="col">

`src/schemas/specialMove.graphql`

```graphql
type SpecialMove{
  ...

  """
  使用キャラクター
  """
  usedBy: [Character!]!
}
```

</div>
</div>

---

# 関係性の追加

<div class="container">
<div class="col">

`src/schemas/character.graphql`
を追加して、必殺技と同様のスキーマを定義

キャラクター側には使える必殺技のフィールドを追加する

必殺技とキャラクターで互いに参照する関係（多対多）

</div>
<div class="col">

`src/schemas/character.graphql`

```graphql
type Character{
  ...

  """
  使える必殺技
  """
  learnedSpecialMoves: [SpecialMove!]!
}


```

</div>
</div>

---

# 関係性の追加

<div class="container">
<div class="col">

したらリゾルバ実装しよう
ってなるんですが、困ることが起きます

スキーマでSpecialMoveとCharacterが循環してる状態になると、
型定義も同様に循環してしまう

すると実装が無限ループする

</div>
<div class="col">

`usedBy`と`learnedSpecialMoves`のフィールドで循環してる

```graphql
type SpecialMove{
  ...

  usedBy: [Character!]!
}

type Character{
  ...

  learnedSpecialMoves: [SpecialMove!]!
}
```

</div>
</div>

---

# 関係性の追加

<div class="container">
<div class="col">

対策として、
SpecialMoveとCharacterの型定義が循環しないように
マッパーを使って細工します

`src/types/models.ts`
を追加して

</div>
<div class="col">

`src/types/models.ts`

```typescript
export type SpecialMoveModel = {
  id: string;
  name: string;
  description?: string;
  usedBy: { id: string }[];
};

export type CharacterModel = {
  id: string;
  name: string;
  description?: string;
  learnedSpecialMoves: { id: string }[];
};
```

</div>
</div>

---

# 関係性の追加

<div class="container">
<div class="col">

Codegenの設定でマッパーを利用するように変更

これでSpecialMoveとCharacterの型が自動生成のものではなく、
マッパーに設定した型になります
</div>
<div class="col">

`codegen.ts`

```typescript
"src/types/types.generated.d.ts": {
  plugins: ["typescript", "typescript-resolvers"],
  config: {
    useIndexSignature: true,
    mappers: {
      SpecialMove: "./models#SpecialMoveModel",
      Character: "./models#CharacterModel",
    },
  },
}
```

</div>
</div>

---

# 関係性の追加

あとは実装を追加します

ポイントは、SpecialMoveのルートリゾルバに`usedBy`のリゾルバを実装すること
Characterも同様に`learnedSpecialMoves`のリゾルバを実装する

`src/resolvers/index.ts`での読み込みも忘れずに

スライドに載せ切れないので、コミット見てください...

---

# 関係性の追加

補足
フィールドにリゾルバがない場合は、ライブラリ側で同名のプロパティが読み取られます

例えば
SpecialMoveのルートに`usedBy`のフィールドだけリゾルバを書いていますが、それ以外の項目は各クエリリゾルバで返されるオブジェクトから値が返されています

[トリビアルリゾルバ](https://graphql.org/learn/execution/#trivial-resolvers)なんて呼ばれます
