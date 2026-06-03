# 2時間ごとの巡回手順書（Claude Code 向け）

これは私（Claude Code）が2時間ごとにCronCreateで起動された時に読む手順書。
ユーザー（先輩 / ちゃちゃ / @doudemo_nandemo）に刺さる記事を選んで翻訳・要約する。

## ステップ

### 1. 状態確認
- `C:\Users\rikut\Desktop\chacha_feedly\content\state.json` を読む
- `processed_urls` に既に処理済みURLが入っている
- `feedback` には先輩のいいね/バッド履歴（フィードバック反映用）

### 2. フィード取得
- `feedly_my_latest` を呼ぶ。`limit: 100` 程度
- 22フィード分の最新記事リストが返ってくる

### 3. 新着抽出
- `state.json.processed_urls` に**入っていないURL**だけ残す
- 過去24時間以内に publish された記事のみ対象（古すぎる新規フィード混入を防ぐ）

### 4. 各記事の処理

各新着について以下を実行:

#### 4-1. 元記事HTML取得
- `WebFetch` で記事URLを取得
- 本文・画像URL・コードブロックを抽出

#### 4-2. 翻訳・要約・刺さるポイント生成

私（Claude）自身が以下を生成。**Claude APIは使わずサブスク内で処理**。

- **title**: 日本語の見出し（元タイトルを自然な日本語に）
- **summary**: 3-5行の概要（何の話か）
- **hits**: 「先輩に刺さるポイント」(2-4行)
  - 先輩の文脈を踏まえる:
    - CVE実績（CVE-2025-59152、H.VIEW HV-500S6のOS Command Injection、認証バイパス）
    - SmoothのCTO/CISO業務（GCP、Cloud Run、IoT、Flutter、Python、Node.js）
    - OSCP進捗（Phase 1-4、AD、PrivEsc）
    - 写真（Fujifilm X100VI / X-T5、ストリートスナップ）
    - 興味（Bug Bounty、Red Team、Pentesting、AIエージェント、LLMセキュリティ）
  - feedback履歴を見て、先輩が👎したパターンは避ける、👍したパターンに寄せる
- **body**: 全文翻訳のMarkdown
  - 画像は `![](元URL)` でオリジン参照のまま埋め込み
  - コードブロックは原文のまま
  - 見出し構造を保持

#### 4-3. Markdownファイル保存

`content/articles/<YYYY-MM-DD>/<slug>.md` に以下のfrontmatter付きで保存:

```markdown
---
title: "日本語タイトル"
source: "フィード名（例: piyolog）"
source_url: "https://元記事URL"
published_at: "2026-06-04T10:00:00Z"
summary: "3-5行の概要"
hits: "先輩に刺さるポイント"
category: "Security / Photo / Podcast"
---

# 本文Markdown
```

### 5. state.json 更新
- 処理したURLを `processed_urls` に追加（値は処理日時）
- `last_patrol` に現在時刻を入れる

### 6. Git push
```bash
cd /c/Users/rikut/Desktop/chacha_feedly
git add content/
git commit -m "patrol: <YYYY-MM-DD HH:MM> 新着N件"
git push origin main
```
→ Vercel自動デプロイ

### 7. HackTricks連載（毎日1本）

- `content/hacktricks-series/CURRICULUM.md` のカリキュラム順を確認
- 今日の分がまだなら（`content/hacktricks-series/` を見て未生成のDayを探す）執筆
- 元ネタは `hacktricks_search` / `hacktricks_read` で取得
- OSCP合格動線の文脈を意識して書く
- `content/hacktricks-series/<NNN>-<slug>.md` に保存

## 制限

- 1巡回あたり最大処理記事数: **10件**（多すぎたら hits が高そうな順で選ぶ）
- 写真系（r/fujifilm等）は1巡回あたり1-2件まで（メインはセキュリティ）
- Podcast（Darknet Diaries）はエピソード説明だけ翻訳、本編transcribeは別途依頼があれば

## フィードバック学習

`feedback` には `{slug: {likes: N, dislikes: N}}` が入る。
- 👍多い記事の共通パターン（ソース・トピック・hits の書き方）を覚える
- 👎多い記事のパターンは次回以降避ける
- これは私自身がCLAUDE.mdまたは別ファイルにメモを残して継承する
