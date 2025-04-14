# Amazing GraphQL App
## 環境構築

- vscode のDevcontainerで開けばOK
- バックエンドの起動が前提なので、バックエンドを起動しておく
  - `bun start` バックエンドのコンテナで
- `bun dev` フロントエンド起動
  - ホットリロードが有効

## 動作確認

ローカルホスト3000でアクセスできます

## 開発

開発中に利用できる諸々のスクリプトを用意してます

- 開発/ビルド
  - `bun dev` : 開発サーバー起動
  - `bun run build` : ビルド
  - `bun preview` : ビルド結果確認


- GraphQLスキーマに合わせた型情報の生成
  - バックエンドからスキーマを取得します、バックエンド起動が必要です
  - `bun codegen`
  - `bun codegen-watch` :　watchオプション付き

- リンター・フォーマッター
  - いずれも `src/`配下のソースに対してリンターを掛けます
  - `bun check` : biome check実行
  - `bun format` : biome format実行
  - `bun lint` : biome lint実行
