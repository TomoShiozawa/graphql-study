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
# GraphQL勉強会 #4

### ~ 実装編:破 クライアント側の実装してみる編~

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
}

.title {
  position: absolute;
  top: 0px;
  font-size: 220px;
  letter-spacing: -50px;
}

.jissou {
  writing-mode: vertical-rl;
  letter-spacing: -20px;
  font-size: 200px;
  position: absolute;
  right: 130px;
  bottom: 100px;
}

.number {
  position: absolute;
  left: 130px;
  bottom: 80px;
  font-size: 150px;
}
</style>

<div class="title">
クライアント
</div>
<div class="jissou">
実装
</div>
<div class="number">
第四話
</div>

---

# クライアント側の実装してみる編

- 前回作ったバックエンドを使って、クライアント側の実装やってみます
- サンプルはリポジトリにあげてます
  - [リポジトリこちら](https://github.com/TomoShiozawa/graphql-study)
- `main`ブランチを使って説明します

---

# 使用するもの

- Apollo Client
  - <https://www.apollographql.com/docs/react>
  - GraphQLのクライアント, Reactに入れて使います
  - React以外のライブラリにも対応してるらしい

---

# 動作環境

- DevContainer立ち上げればOK
  - バックエンドとフロントエンド用の2つ用意してます
- バックエンドの起動も必要です
  - バックエンド: 'bun start'
  - フロントエンド: 'bun dev'

---

# Apollo Clientを使う理由

- GraphQL APIはHTTPでリクエストできれば使える
  - fetch でも axios でもOK
- Apollo Clientをなぜ使うのか？
  - ReactのHookを提供してくれてる `useQuery`とかで使えちゃう
  - キャッシュもしてくれる
  - 逆にいうと、勝手に中で色々してる
- 他のGraphQLクライアント
  - urql
  - Relay

---

# 動作の確認

1. リポジトリクローン
2. DevContainer起動
3. フロント起動
   1. `bun dev` フロントのコンテナで
4. バックエンド起動
   1. `bun start` バックエンドのコンテナで
5. `localhost:3000`で動けばOK

---

# とりあえずコード見てみる

`stc/main.tsx`が入口です

やってることはざっくり

- GraphQLのクライアント`apolloClient`を設定
- `ApolloProvider`でアプリがクライアントを利用できるようにする

です

---

# とりあえずコード見てみる

`stc/main.tsx`が入口です

ちょっと補足

クライアントの設定で`split`の関数でリクエストするURLを分けるようにしてます

これはサブスクリプションのリクエストをする際にWebSocketのリクエストをするためです

---

# とりあえずコード見てみる

`stc/App.tsx`がアプリのメインです

中にあるコンポーネントが主にGraphQLにリクエストしているコンポーネントです

- `SpecialMoves`
- `Characters`
- `InputForms`
- `Subscriptions`

---

# データのクエリ

`SpecialMoves`のコンポーネントから見ていきます

必殺技のデータをクエリして表示してます
ポーリングについては後で話します

`const GET_SPECIAL_MOVES`でデータ取得のクエリを定義
ただの文字列ではなく、クライアントが利用できるように`graphql`を使った定義です

`specialMovesCount` と `allSpecialMoves` が1回のリクエストで取れる
GraqhQLの強み

---

# データのクエリ

`useQuery`を利用してリクエストしてます
`useQuery`はApollo Clientから提供されているHook

```typescript
const { loading, error, data, refetch } = useQuery(GET_SPECIAL_MOVES, {
  variables: { after },
  pollInterval: pollInterval ? Number.parseInt(pollInterval) : 0,
});
```

`data`に返されるデータが入るので、あとは表示するだけ
`refetch`についてはキャッシュのあたりで合わせて説明します

---

# ミューテーション

同じく`SpecialMoves`では
削除用のミューテーションもリクエストします

大まかな作りはデータ取得と変わりません
`const DELETE_SPECIAL_MOVE`にミューテーションのクエリを定義
`useMutation`のHookを利用

`useQuery`だとレンダリング時に自動でリクエストしますが、
`useMutation`の場合はミューテーション用の関数を呼び出す必要があります

---

# ミューテーション

`useMutation`のフックから返されるリクエスト関数`deleteSpecialMove`
を削除ボタンのクリックで呼び出しています

フックから返される2つ目にはデータやローディングステータスなどが返ってきますが、
今回はローディングのステータスだけ利用しています

---

# ミューテーション

今度は `InputForms`のコンポーネントを見ていきます

新規作成のミューテーションを読んでいます

`variables`にクエリ変数を設定しています
変数の値はフォームの入力値(state)です

---

# ちょっといじってみる

一旦ここで少しいじってみます

例えば`Characters`のコンポーネントから`description`の項目を無くそうと思います

クエリから`description`を消せば良いんですが、
この時に困るのが型定義...

安心してください
Codegenの用意してますよ

---

# ちょっといじってみる

`bun codegen-watch` でソースの監視をしつつ
リクエストするクエリに応じた型定義を生成してくれます

さらにポイント
`codegen.ts`で設定しているスキーマ元を `http://backend:4000/graphql/`にしてます

GraphQL APIのスキーマをAPIから取得できるので、
クライアント側でAPIのスキーマ定義のファイルはいらないという
(もちろんファイルの指定もできます)

---

# キャッシュとか

さてAPIからのデータ取得は良いですが、
キャッシュとかはどうなるんでしょう？

Apollo Clientだとキャッシュもよしなにしてくれます

クエリとクエリ引数が同じリクエストの場合はキャッシュから優先して返却される挙動になります

---

# キャッシュとか

例として`SpecialMoves`のコンポーネントを見てみます

`after`というクエリ引数を持っているのそれ込みでリクエストしてみます
DevToolを見ると一度リクエストした値の場合はnetworkのリクエストが飛ばないことが確認できる

直前の時刻でリクエストしたあと、必殺技を追加してから再度リクエストも必殺技は追加されない
→ キャッシュから返されるので

---

# キャッシュとか

キャッシュからではなく、再度APIに問い合わせたい時は
`refetch`を使います
再取得ボタンで呼び出してるのがこれ

またキャッシュの利用については
`useQuery`のオプションとして`fetchPolicy`を設定できます
[参考](https://www.apollographql.com/docs/react/data/queries#supported-fetch-policies)

デフォルトは`cache-first`
データがキャッシュにあればキャッシュから、なければサーバーにクエリ実行という挙動

---

# キャッシュとか

ちなみに
もちろんサーバー側でもキャッシュできます
`Apollo Server`もキャッシュ機能あります

この辺りもどこかでやりたいけども...

---

# サブスクリプション

クエリとかミューテーションの基本はOK
あとはサブスクリプション

とはいえ、やることは一緒

`Subscriptions`コンポーネントを見ていきます

サブスクリプションのクエリを定義して
`useSubscription`でリクエスト
今回は必殺技の新規作成をSubしてます
新規作成に合わせて必殺技が表示されるはず

---

# サブスクリプション

ちょっと補足
`useSubscription`も`useQuery`と同様にレンダリング時にリクエストが飛んでコネクションが貼られます
DevToolで見るとWebSocketの通信がおえるはず

---

# ポーリング

余程なリアルタイム性が求められなければサブスクリプションじゃなくても十分だったりします

例えばポーリング
Apollo Clientはポーリング機能も提供してくれてる

`SpecialMoves`, `Characters`コンポーネントの`useQuery`に`pollInterval`のオプションを設定しています
設定された値(ms)の間隔でリクエストしてくれる
ポーリングでのリクエストはAPIへのリクエストになる(キャッシュが更新される)

---

# キャッシュ周り

ここからは`Apollo Client`のキャッシュ機能を少し深掘り

例えばデータを追加した時に、最新の状態にするために`refetch`するような場合

キャッシュを直接更新することで`refetch`しなくてもデータ表示を更新することできるよ

データ追加のミューテーションでは追加されたデータが返却されているので、そのデータを直接キャッシュに入れちゃう作戦

---

# キャッシュ周り

`InputForm`の必殺技作成後にクエリのキャッシュを直接更新するようにしてみます

サンプルのコミットは
ブランチ`feature/example-commits-#4`
commit id: `3167d30`
にあるのでそれから取ってきてもOK

---

# キャッシュ周り

`InputForm`の中の必殺技作成の`useMutation`の中で`update`関数を渡します

`update`では変更内容や既存のキャッシュについてのオブジェクトが利用できます
既存のデータ取得クエリのキャッシュに対して、直接データを突っ込みます

キャッシュが更新されると、コンポーネントも自動で再レンダリングされます
→ `refetch`しなくても新しいデータの表示が追加される

---

# キャッシュ周り

`SpecialMoves`の中の削除処理についても、データ削除後に該当のキャッシュを直接削除するようにしてみます

`cache.modify`を使っていますが、これは該当のキャッシュを上書きするメソッドです
単純にキャッシュの中から削除されたデータを消したもので上書きをするようにしています

`Characters`の方はあえて`refetch`をするように残しているので、合わせて見てみてください

---

# 最後に

どうでしたか？
クライアント側の実装もこれでOKですかね

次回作にご期待ください
