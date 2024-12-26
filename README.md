# graphql-sample
## 環境構築

- vscode のDevcontainerで開けばOK
- `bun start`で開発サーバー起動
  - ホットリロードが有効

## レスポンス確認

ローカルの4000番にリクエストしてください


サンプル
```
curl http://localhost:4000/graphql -H "Content-Type: application/json" -d '{"query": "{books { title author }}"}'
```
