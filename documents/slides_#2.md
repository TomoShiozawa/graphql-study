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
  - これがないとAPI作れないぜ

---

# スキーマファースト

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

  </div>

  <div class="col">

  ```
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

  ```
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

  ```
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

# カスタスカラー型

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

  ```
  scalar
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

  ```
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

  ```
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

  ```
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

  ```
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

```
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

```
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
