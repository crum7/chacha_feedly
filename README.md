# chacha_feedly

先輩（ちゃちゃ / @doudemo_nandemo）専用のFeedlyリーダー。

## 何これ

- Feedlyの購読フィード（22件）を2時間ごとにClaude Codeが巡回
- 新着記事を日本語に翻訳、概要と「先輩に刺さるポイント」を生成
- HackTricksベースのOSCP動線オリジナル連載を毎日1本配信
- 画像・レイアウトは元記事のオリジン参照のまま保持
- いいね/バッドのフィードバックで「刺さるポイント」の精度を上げていく

## 構成

```
chacha_feedly/
  content/
    articles/<date>/      # 翻訳済み記事Markdown
    hacktricks-series/    # OSCP動線オリジナル連載（毎日1本）
    state.json            # 処理済み記事URL（重複防止）
  scripts/
    daily-cron.md         # Claude巡回時の手順書
  webapp/                 # Next.js (Vercel)
    app/                  # App Router
    lib/                  # 記事ロード・KV操作
```

## 巡回フロー

1. CronCreateで2時間ごとに私（Claude Code）を起動
2. `feedly_my_latest` で全22フィードの最新を取得
3. `state.json` と突き合わせて新着のみ抽出
4. 各記事について:
   - 元記事HTML取得（画像URLは保持）
   - 全文翻訳
   - 概要（3-5行）
   - 「先輩に刺さるポイント」（先輩のCVE実績・興味・OSCP進捗を踏まえて）
   - `content/articles/<date>/<slug>.md` に保存
5. `state.json` 更新
6. `git push` → Vercel自動デプロイ

## HackTricks連載

OSCP合格動線で網羅順、毎日1本。カリキュラムは `content/hacktricks-series/CURRICULUM.md` 参照。

## デプロイ

Vercel無料枠 + Vercel KV（いいね/バッド保存）。
