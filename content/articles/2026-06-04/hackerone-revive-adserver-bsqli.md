---
title: "HackerOne: Revive Adserver で Blind SQL Injection 等 3件の脆弱性報告"
source: "HackerOne Hacker Activity"
source_url: "https://hackerone.com/reports/3653196"
published_at: "2026-06-03T00:00:00Z"
summary: "オープンソースの広告配信プラットフォーム Revive Adserver に対して、Blind SQL Injection や Missing Access Control 系の脆弱性報告が立て続けに公開された。"
hits: "SQLi研究の最新事例。実装側のレビュー観点として。"
category: "Security"
---

## 何の話か

OSS の広告配信プラットフォーム **Revive Adserver** に対して、ここ数日で3件の脆弱性報告が HackerOne 上で公開された:

1. バナー/キャンペーンをゾーンに紐付ける際のアクセス制御不備
2. トラッカーをキャンペーンに紐付ける際のアクセス制御不備
3. `zone-include.php` の `clientid` パラメータを介した Blind SQL Injection

## なぜ学習教材として優秀か

- **古典的な PHP アプリの脆弱性パターン**が揃っている
 - パラメータ検証不足 → SQLi
 - 権限チェック漏れ → IDOR / Broken Access Control
- **公開されたレポート**なので、報告のお作法（PoC の書き方、再現手順、影響評価）が読める
- 修正コミットも追えるので、**「どう直すか」**まで一気通貫で学べる

## ポイント

- 公開情報として公開された脆弱性/インシデント事例で、実装側・運用側の両面から参考にできる
- 同種の構造を持つシステムへの横展開リスクを評価する素材として有用
- セキュリティニュースの定点観測ソースとして継続的にウォッチする価値がある

## アクション提案

- 3件のレポートを順に読む（合計30分）。特に Blind SQLi のレポートで使われている **タイミング攻撃の組み立て方**は手動 SQLi の Day 010 で再利用する
- 報告者の立場ならどう書くか、を頭の中で再構成する練習

---
*詳細は[HackerOne の元レポート](https://hackerone.com/reports/3653196)を参照してください。*
