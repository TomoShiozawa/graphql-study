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
# GraphQL勉強会 #2

### ~スキーマ設計してみよう編~

---

# 今回はスキーマ設計してみよう編

- スキーマって何？
  - GraphQLのAPIのデータ型を定義するもの
  - APIがどんな型のクエリを受けるのか、どんなものを返すのか、という仕様

---

# 余談: スキーマファースト

スキーマファーストという考え方

- 開発者全員がデータ型について共通認識を持って開発してく
- スキーマ(仕様)が先に決まっていて、それに合わせてコードができていく
- バックエンドはスキーマに応じたデータを返すように実装
- フロントエンドはスキーマに合わせたインターフェースを実装
- みたいな世界観

---

# 余談: コードファースト

スキーマファーストと対になる考え方

- コードからスキーマ(仕様)を生成する世界観
  - 実装からスキーマを生成する感じ
- 開発体験はこっちの方が良いかも、実装がスキーマに縛られないから
- 決してコードファーストが悪というわけじゃないです
  - スキーマファーストにしろコードファーストにしろ、仕様と実装が乖離しないようにしたい

---

# SDL

閑話休題

GraphQLのスキーマ定義って何で書くの？

### スキーマ定義言語（SDL）

で書きます

---

# スキーマ設計

スキーマの基本は型です, 型定義の集合です

型は扱うデータを表現します

型はデータに応じたフィールドを持ちます

またフィールドごとの型定義がされています

---

# 実際に書き始めてみる

<div class="container">
<div class="col">
スキーマ定義はテキストファイルとして記述できます

拡張子は `.graphql` です
（これは慣習らしい）

例えば必殺技の型定義をします

この後の例は必ずその通りにやらなくても大丈夫です、各自好きなようにやってみてください

</div>
<div class="col">

```graphql
type SpecialMove {
  id: ID!
  name: String!
  power: Int!
  description: String
}
```

</div>
</div>

---

# 実際に書き始めてみる

<div class="container">
<div class="col">
SpecialMove型の定義をしました

idという固有の識別子を持っています

また下記のフィールドを持ちます

- name: 技名
- power: 威力
- description: 説明

</div>
<div class="col">

```graphql
type SpecialMove {
  id: ID!
  name: String!
  power: Int!
  description: String
}
```

</div>
</div>

---

# 実際に書き始めてみる

<div class="container">
<div class="col">

`!`でnullにならないことが
示されます

`name!`, `power!`には必ず値が入る
`description`はnullになりうる

`id!` はID型の定義になる

ID型：JSONとしては文字列を返すが、値が重複しないようにバリデーションされる

</div>
<div class="col">

```graphql
type SpecialMove {
  id: ID!
  name: String!
  power: Int!
  description: String
}
```

</div>
</div>

---

# カスタムスカラー型

<div class="container">
<div class="col">

組み込みのスカラー型は下記

- Int
- Float
- String
- Boolean
- ID

独自の型をカスタムスカラーとして定義できる

</div>
<div class="col">

```graphql
scalar DateTime

type SpecialMove {
  id: ID!
  name: String!
  power: Int!
  description: String
  birthday: DateTime
}
```

</div>
</div>

---

# Enum

<div class="container">
<div class="col">

Enumも別途定義できます

</div>
<div class="col">

```graphql
enum AttackType {
  BLOW
  LONG_DISTANCE
  SUPERNATURAL
}

type SpecialMove {
  id: ID!
  name: String!
  power: Int!
  description: String
  attackType: AttackType!
}
```

</div>
</div>

---

# リスト

Listも定義できます

`!` のつき方で定義が変わるので注意

`[Int]` nullかもしれないリスト、中身はnullかもしれない整数
`[Int!]` nullかもしれないリスト、中身はnullではない整数
`[Int]!` nullではないリスト、中身はnullかもしれない整数
`[Int!]!` nullではないリスト、中身はnullではない整数

---

# 型の接続

<div class="container">
<div class="col">

そういえば
必殺技を使う人がいるはず

使用者の型をとりあえず追加

(グラフ理論的に言うとすると
必殺技ノードは、使う人ノードとエッジを持ってるはず)

</div>
<div class="col">

```graphql
type Character {
  id: ID!
  name: String!
}
```

</div>
</div>

---

# 型の接続

<div class="container">
<div class="col">

必殺技に使う人との関係を追加する

(この時点で必殺技ノードが使用者ノードとusedByという関係で繋がったイメージ)

</div>
<div class="col">

```graphql
type Character {
  id: ID!
  name: String!
}

type SpecialMove {
  id: ID!
  name: String!
  power: Int!
  description: String
  attackType: AttackType!
  usedBy: Character!
}
```

</div>
</div>

---

# 型の接続

<div class="container">
<div class="col">

逆にキャラクターも必殺技使える
たぶん複数の必殺技使えるはず

必殺技も使用者が複数いるかも

(伝承者候補が複数いるかもしれないし、コピー能力持ちがいるかもしれないし、師匠が同じこともあるかも)

</div>
<div class="col">

```graphql
type Character {
  id: ID!
  name: String!
  learnedSpecialMoves: [SpecialMove!]!
}

type SpecialMove {
  id: ID!
  name: String!
  power: Int!
  description: String
  attackType: AttackType!
  usedBy: [Character!]!
}
```

</div>
</div>

---

# Query型の定義

<div class="container">
<div class="col">

いったんデータの定義はできた

ので、使用できるクエリを定義する

まずQuery型にフィールドを定義
そしてschemaオブジェクトにQuery型を追加
</div>
<div class="col">

```graphql
type Query {
  allCharacters: [Character!]!
  allSpecialMoves: [SpecialMove!]!
}

schema {
  query: Query
}
```

</div>
</div>

---

# Query型の定義

<div class="container">
<div class="col">

先ほどの定義で右のように
問い合わせることができるようになった

</div>
<div class="col">

```graphql
query {
  allCharacters {
    name
    learnedSpecialMoves
  }
  allSpecialMoves {
    name
    power
    usedBy
  }
}
```

</div>
</div>

---

# スルー型

<div class="container">
<div class="col">

キャラクターが誰と戦ったことがあるのか持たせたい
戦った場所とかの情報も入れておきたい

中間テーブルのようなイメージで関係を表現する型を定義

</div>
<div class="col">

```graphql
type Character {
  id: ID!
  name: String!
  learnedSpecialMoves: [SpecialMove!]!
  participatedShowdowns: [Showdown!]!
}

type Showdown {
  location: String!
  description: String
  characters: [Character!]!
  winners: [Character!]!
}
```

</div>
</div>

---

# ユニオン型

<div class="container">
<div class="col">

必殺技って言っても
スタンドとか、エネルギー波系とかで別物じゃない？

複数の型定義のいずれかを返すように定義できる

</div>
<div class="col">

```graphql
union SpecialMove = Stand | EnergyWave

type Stand {
  id: ID!
  name: String!
  power: StandEvaluation!
  speed: StandEvaluation!
  range: StandEvaluation!
  stamina: StandEvaluation!
  precision: StandEvaluation!
  developmentPotential: StandEvaluation!
  description: String
  usedBy: Character!
}

type EnergyWave {
  id: ID!
  name: String!
  power: Int!
  description: String
  usedBy: [Character!]!
}
```

</div>
</div>

---

# インターフェース

<div class="container">
<div class="col">

必殺技にも共通のフィールドがあるな
名前とか使用者とか

インターフェースを使うと抽象化できる

実装型は指定されたフィールドが必須になる

</div>
<div class="col">

```graphql
interface SpecialMove {
  id: ID!
  name: String!
  usedBy: [Character!]!
  description: String
}

type EnergyWave implements SpecialMove {
  id: ID!
  name: String!
  usedBy: [Character!]!
  description: String
  power: Int!
}

type SpecialAbility implements SpecialMove {
  id: ID!
  name: String!
  usedBy: [Character!]!
  description: String
  condition: String
}
```

</div>
</div>

---

# インターフェース

<div class="container">
<div class="col">

インターフェースを利用すると
クエリに対して返される型が実装型のいずれかになる

クエリする際は`インラインフラグメント`を使って方に応じた項目を要求できる
</div>
<div class="col">

```graphql
query ExampleQuery {
  allCharacters {
    learnedSpecialMoves {
      name
      description
      ... on EnergyWave {
        power
      }
      ... on SpecialAbility {
        condition
      }
    }
  }
}

```

</div>
</div>

---

# 引数

<div class="container">
<div class="col">

特定の必殺技だけ取得したい

という時は引数を使うと良い

引数にも型定義が必要

</div>
<div class="col">

```graphql
type Query {
  allCharacters: [Character!]!
  allSpecialMoves: [SpecialMove!]!
  character(id: ID!): Character!
  specialMove(id: ID!): SpecialMove!
}
```

</div>
</div>

---

# 引数

<div class="container">
<div class="col">

打撃系の必殺技だけでフィルタリングしたい

みたいな時も引数が使える
必須ではない引数として定義

</div>
<div class="col">

```graphql
type Query {
  allCharacters: [Character!]!
  allSpecialMoves(attackType: AttackType): [SpecialMove!]!
  character(id: ID!): Character!
  specialMove(id: ID!): SpecialMove!
}
```

こんなクエリになるイメージ

```graphql
query {
  allSpecialMoves(attackType: BLOW) {
    name
    power
  }
}
```

</div>
</div>

---

# 引数

<div class="container">
<div class="col">

そのほか、ページングしたい、ソートしたい
という時も引数で表現できます

デフォルト値を設定することも可能

</div>
<div class="col">

```graphql
type Query {
  allCharacters(first: Int = 10): [Character!]!
  allSpecialMoves(
    attackType: AttackType
    sort: Direction = DESC
    sortBy: SortField = power
  ): [SpecialMove!]!
  character(id: ID!): Character!
  specialMove(id: ID!): SpecialMove!
}
```

</div>
</div>

---

# ミューテーション

<div class="container">
<div class="col">

今度はミューテーションの定義をしてみる

ユーザーができることを定義するのが良い

</div>
<div class="col">

```graphql
type Mutation {
  postCharacter(name: String!): Character!
  postSpecialMove(
    name: String!
    usedBy: [ID!]!
    description: String
  ): SpecialMove!
}

schema {
  query: Query
  mutation: Mutation
}
```

</div>
</div>

---

# サブスクリプション

<div class="container">
<div class="col">

ミューテーションできたらサブスクリプション

例えば新規作成を拾うサブスクリプションを定義する

もちろんサブスクリプションでも
引数使えるので ご自由にどうぞ

</div>
<div class="col">

```graphql
type Subscription{
  newSpecialMove: SpecialMove!
  newCharacter: Character!
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
```

</div>
</div>

---

# 入力の型定義

<div class="container">
<div class="col">

さて、例えば右みたいなやつがあった時
こう思います

いや、引数の数多くね

ということで `input`の出番です

</div>
<div class="col">

```graphql
type Mutation {
  postStand(
    name: String!
    power: StandEvaluation!
    speed: StandEvaluation!
    range: StandEvaluation!
    stamina: StandEvaluation!
    precision: StandEvaluation!
    developmentPotential: StandEvaluation!
    description: String
    usedBy: Character!
  ): Stand!
 }
```

</div>
</div>

---

# 入力の型定義

<div class="container">
<div class="col">

`input`は引数にだけ利用できる型定義です

また`input`の定義は使いまわすことができます

</div>
<div class="col">

```graphql
input StandInput {
  name: String!
  power: StandEvaluation!
  speed: StandEvaluation!
  range: StandEvaluation!
  stamina: StandEvaluation!
  precision: StandEvaluation!
  developmentPotential: StandEvaluation!
  description: String
  usedBy: Character!
}

type Mutation {
  postStand(input:StandInput!): Stand!
  updateStand(id:ID! input:StandInput!): Stand!
}
```

</div>
</div>

---

# 入力の型定義

<div class="container">
<div class="col">

フィルタ条件やページング用の入力型を定義して使いまわすなんてことも

</div>
<div class="col">

```graphql
input DataSort {
  sort: Direction = DESC
  sortBy: SortField = power
}

type Query {
  allSpecialMoves(sort: DataSort)
  allStands(sort: DataSort)
}
```

</div>
</div>

---

# コメント

<div class="container">
<div class="col">

各定義の説明を書いておきたくなってきたところかと思います

コメントの書き方にルールはありませんが、
Playgroundなどで良い感じに出してくれるようにしておくと便利

</div>
<div class="col">

```graphql
"""
必殺技
"""
type SpecialMove {
  """
  必殺技のID
  """
  id: ID!

  """
  技名
  """
  name: String!

  """
  力こそパワー
  """
  power: Int!

  """
  説明
  """
  description: String
}
```

</div>
</div>

---

# コメント

<div class="container">
<div class="col">

`"` でコメント行

`"""` で囲ってブロックコメントが記載できます

</div>
<div class="col">

```graphql
type Mutation {
  """
  キャラクターの登録
  """
  postCharacter(
    "キャラクターの名前"
    name: String!
  ): Character!

  """
  必殺技の登録
  """
  postSpecialMove(
    "必殺技名"
    name: String!
    "利用キャラ"
    usedBy: [ID!]!
    "説明"
    description: String
  ): SpecialMove!
}
```

</div>
</div>
