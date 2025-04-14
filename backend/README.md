# graphql-sample
## 環境構築

- vscode のDevcontainerで開けばOK
- ルートに`.env`ファイルを作成してください
  - `.env.sample`を参考に
  - `DATABASE_URL`にpostgresのコンテナへの接続URLを設定します
- `bun start`で開発サーバー起動
  - ホットリロードが有効

## 動作確認

ローカルホスト4000でアクセスできます
ApolloSandboxが開ければOK

## 開発

開発中に利用できる諸々のスクリプトを用意してます

- GraphQLスキーマに合わせた型情報の生成
  - `bun codegen`
  - `bun codegen-watch` :　watchオプション付き

- Prisma関連
  - `bun db:studio` : PrismaStudioの起動
  - `bun db:dev` : migrate devの実行
  - `bun db:deploy` : migrate deploy と generate を実行
  - `bun db:seed` : シード値の登録

- リンター・フォーマッター
  - いずれも `src/`配下のソースに対してリンターを掛けます
  - `bun check` : biome check実行
  - `bun format` : biome format実行
  - `bun lint` : biome lint実行
