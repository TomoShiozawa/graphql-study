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
# GraphQL勉強会 #1

### ~GraphQLのクエリを投げてみよう編~

---

# GraphQLって何？

- APIのためのクエリ言語
  - 必要なデータを１つのクエリでとってこれる
- Facebookが開発したよ
  - 2015年に公開
  - 今はGraphQL財団に譲渡されてる

---

# RESTじゃダメなの？

RESTの限界として、下記のようなことが挙げられる

- 過剰・過小なデータ取得
  - 必要なデータ以外のデータが含まれているエンドポイント
  - 関連するデータがないので、別のエンドポイントから取ってこないといけない
- エンドポイントの管理の課題
  - 必要なデータだけに最適化して応えられるようにすると、エンドポイントを増やさないといけない

---

# RESTじゃダメなの？

GraphQLであれば、

- エンドポイントは1つ
- １回のリクエストで必要なデータを取得できる
  - クエリを変えれば取りたいデータだけ取ってこられる

---

# GraphQLはRESTを置き換えるのか？

（ここは、私個人の感想です）

うーん、どうでしょう？

既存のREST APIで十分なアプリケーションならRESTで問題ないと思う
RESTだと仕様が適合しなくなってきた、限界がきた、となったらGraphQLの出番かも

新しいAPIを作るときにGraphQLにしようはアリ

---

# GraphQLとグラフ理論

GraphQLのベースにはグラフ理論的な考えがあります

が、グラフ理論はそんなに詳しく知らなくても大丈夫（だと思う）

クエリを使って関連するデータまで含めて取ってくるときの考えが、グラフのノードとエッジの関係になる

---

# 文字ばっかりで飽きた

ので、実際にクエリ言語を使ってリクエストしてみる

実際にGraphQLのリクエストがどういうものになるのか、どういうレスポンスになるのか

というのがイメージできるようにやってみる

---

# GraphQLへのリクエスト

GraphQL自体は通信プロトコルを規定しませんが、
ほぼHTTPだと思います

今回は架空のゲレンデ情報を返してくれるPlaygroundを使います
[Snowtooth](http://snowtooth.moonhighway.com/)
[GitHub Repository](https://github.com/MoonHighway/snowtooth)

リンクからアクセスすると、GraphQL Playgroundが利用できます
アプリ版もあるので、アプリでやりたい方は同じエンドポイントを入力してください

---

# GraphQLへのリクエスト

<div class="container">

  <div class="col">
  クエリを下記のように記述してリクエスト

  ```
  query {
    allLifts {
      name
      status
    }
  }
  ```

  </div>

  <div class="col">
  レスポンスはJsonで下記のような形

  ```
  {
    "data": {
      "allLifts": [
        {
          "name": "Astra Express",
          "status": "HOLD"
        },
        {
          "name": "Jazz Cat",
          "status": "OPEN"
        },
        ...
  ```

  </div>
</div>

---

# GraphQLへのリクエスト

取得したい項目を増やしたい場合は、クエリに追加するだけでOK

いや、でもどんな項目があるのかわからないんだけど...

というときに使えるのが、

### インストロペクション

---

# GraphQLへのリクエスト

## インストロペクション

<div class="container">
<div class="col">

GraphQLの機能のひとつ
APIスキーマ（GraphQLの仕様）を返してくれます

右のように`__schema` をクエリで指定するとスキーマを取得できる
</div>

<div class="col">

```
query {
  __schema {
    types {
      name
      description
    }
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

## インストロペクション

<div class="container">
<div class="col">

`Lift`という型があることがわかったので、
`Lift`型のフィールドについて確認してみる

</div>
<div class="col">

```
query {
  __type(name:"Lift") {
  name
    fields {
      name
      description
      type {
        name
      }
    }
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

## インストロペクション

<div class="container">
<div class="col">

リフトの情報をとってくる以外もできるんでしょ？

どんなフィールドが使えるのか知りたいときにも使えます

</div>
<div class="col">

```

query {
  __schema {
    queryType {
      name
      fields {
        name
        description
      }
    }
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

## 余談

(ここは、個人の感想です)

GraphQLはスキーマが必ず定義されている
→ クエリと返ってくるものの型が一致している

RESTの場合だとAPI定義をOpenAPIとか使って頑張ってたけど、
実装レベルで定義がされているのでそういう点でもRESTに比べてのメリットがあるかも

---

# GraphQLへのリクエスト

## データ取得に戻るよ

<div class="container">
<div class="col">
トレイル情報も取得したい

2回叩かないとダメなの？

いいえ、1回でできます
そうGraphQLならね

</div>
<div class="col">

```
query {
  allLifts {
    name
    status
  }
  allTrails {
    name
    difficulty
    status
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

OPENになってるやつだけ欲しいんだけど？

クエリ引数が使えます

</div>
<div class="col">

```
query {
  liftCount(status: OPEN)
  trailCount(status:OPEN)
  allLifts(status: OPEN) {
    name
    status
  }
  allTrails(status: OPEN) {
    name
    difficulty
    status
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

最寄りの`Jazz Cat`のリフトから行けるコースの一覧が欲しい

入れ子にして関連付けされているオブジェクトの取得ができるクエリにする

</div>
<div class="col">

```
query {
  Lift(id:"jazz-cat") {
    name
    status
    trailAccess {
      name
      status
      difficulty
    }
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

右みたいにフィールドをいちいち指定するのだるい...

というときに使えるのが

### フラグメント

</div>
<div class="col">

```
query {
  Lift(id:"jazz-cat") {
    name
    status
    capacity
    night
    elevationGain
    trailAccess {
      name
   status
      difficulty
    }
  }
  Trail(id:"river-run") {
    name
    difficulty
    accessedByLifts {
      name
      status
      capacity
      night
      elevationGain
    }
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

## フラグメント

冗長になる部分を、あらかじめ名前をつけて定義できる

`fragment`という識別子をつけて作成できる

</div>
<div class="col">

```
fragment liftInfo on Lift {
  name
  status
  capacity
  night
  elevationGain
}
```

</div>
</div>

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

## フラグメント

追加したフラメントを使ってクエリを書き換えると
多少スマートになった感

フラグメントを使ってフィールドを指定するときはスプレッド構文みたく`...`をつけます

</div>
<div class="col">

```
query {
  Lift(id:"jazz-cat") {
  ...liftInfo
    trailAccess {
      name
   status
      difficulty
    }
  }
  Trail(id:"river-run") {
    name
    difficulty
    accessedByLifts {
      ...liftInfo
    }
  }
}

fragment liftInfo on Lift {
  name
  status
  capacity
  night
  elevationGain
}
```

</div>
</div>

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

項目名がそのままだと扱いづらいんですが...

取得する時にエイリアスつけられます

</div>
<div class="col">

```
query {
  openLiftCount: liftCount(status:OPEN)
  openTrailCount: trailCount(status:OPEN)
  openLifts: allLifts(status: OPEN) {
    name
    status
  }
  openTrails: allTrails(status: OPEN) {
    name
    difficulty
    status
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

データ更新はどうすんの？

今までは`query`で操作してましたが、
書き込みは`mutation`になります

`setLiftStatus` / `setTrailStatus`というミューテーションが用意されてます

</div>
<div class="col">

```
mutation {
  setLiftStatus(id:"jolly-roger" status:OPEN) {
    id
    name
    status
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

idとかベタがきじゃなくて変数にできない？

できます

`$`始まりで変数を定義することができます

値はQUERY VARIABLESから入れればOK

</div>
<div class="col">

```
mutation($id: ID! $status: LiftStatus!) {
  setLiftStatus(id:$id status:$status) {
    id
    name
    status
  }
}
```

```
{
  "id": "jolly-roger",
  "status": "OPEN"
}
```

</div>
</div>

---

# 型について補足

GraphQLでは下記の型が使えます

- String
- Int
- Float
- Boolean
- ID
  - Jsonとしてはstringで返すけど、ユニークにならないといけない
- Enum

---

# GraphQLへのリクエスト

クエリとミューテーション以外にもオペレーションあるみたいなんだけど？

あります

### サブスクリプション

って言います

クライアント側でサーバーの更新をリアルタイムにWebSocketを通じて受け取れます

---

# GraphQLへのリクエスト

<div class="container">
<div class="col">

## サブスクリプション

今度は`subscription`になります

`liftStatusChange` / `trailStatusChange` が用意されてます

(WebSocketがうまく繋がらないこともが多々あるので、諦めずに)
</div>

<div class="col">

```
subscription {
  liftStatusChange{
    name
    capacity
    status
  }
}
```

</div>
</div>

---

# GraphQLへのリクエスト

そういえばエラーになったらどうなるの？

JSONレスポンスは返ってきますが、
`errors`というキーに色々詰め込んで返してきます

成功の場合は`data`というキーがあります

---

# ぶっちゃけGraphQLのデメリットは？

(個人的な意見含みます)

- 学習のコストはそれなり
- 全部POSTのリクエストなのは最初の違和感かも（慣れの問題）
  - GETでデータ更新とかするよりははるかにマシですが
- 大規模なものじゃないと恩恵が分かりにくいかも
  - 小規模ならRESTでも十分だし
  - Netflixとか、それぐらいの規模だと変わるのかな

---

# 終わりに

いかがでしたか
GraphQLサイコーになりましたか？

好評だったら、次回「スキーマの設計やってみる編」をやります
(好評じゃなくてもやると思う)

ありがとうございました
