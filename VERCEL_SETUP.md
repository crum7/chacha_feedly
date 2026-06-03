# Vercel デプロイ手順（先輩向け、初回のみ）

ブラウザ作業で5分。終わったらあとは私（Claude Code）が git push するだけで自動デプロイされる。

## 1. Vercelアカウントログイン

- https://vercel.com/ にアクセス
- 「Continue with GitHub」で `crum7` アカウントでログイン
- 無料 Hobby プランでOK

## 2. プロジェクト作成

- ダッシュボード右上「Add New」→「Project」
- `crum7/chacha_feedly` を選択 → Import
- **Root Directory**: `webapp` を指定 ⚠️ 重要（リポジトリ直下じゃない）
- Framework Preset: Next.js が自動検出されるはず
- Build Command: デフォルトのまま
- Environment Variables: いったん空でOK
- 「Deploy」クリック

→ 初回デプロイ走る。1-2分。`*.vercel.app` のURLが発行される。

## 3. Vercel KV（フィードバック保存用）作成

- プロジェクトの「Storage」タブ
- 「Create Database」→ **「KV」** を選択
- 名前: `chacha-feedly-kv`
- リージョン: `Tokyo (hnd1)` を選択（最速）
- 「Create」

→ KV作成後、自動的にプロジェクトに環境変数（`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`）が注入される。

## 4. 再デプロイ

- 「Deployments」タブ → 最新デプロイの「...」→「Redeploy」
- → KV接続済みでビルドし直し

## 5. 本番URLを私に教える

```
https://chacha-feedly-XXX.vercel.app
```

このURLを `C:\Users\rikut\.claude\CLAUDE.md` の「先輩のプロジェクト」セクションに登録しておくと、次回以降の巡回で私が参照できる。

## 6. （任意）独自ドメイン

`chacha.fukuhara.dev` みたいにしたい場合は「Domains」タブから追加。

---

## 動作確認

1. トップページ：HackTricks Day 1 が表示されているはず
2. 記事をタップ → 詳細ページが開く
3. 👍 / 👎 ボタンを押す → カウントが増える
4. リロードしても自分の選択が残っている（localStorage + KV）

## トラブルシュート

- **ビルドエラー（gray-matterが見つからない等）**: Root Directory が `webapp` になっているか確認
- **KVエラー**: 環境変数が注入されているか「Settings」→「Environment Variables」で確認
- **記事が表示されない**: `content/` が repo にあるか確認。`webapp/lib/articles.ts` は `process.cwd()/../content` を見ているので、Root Directory が `webapp` でないとパスがズレる
