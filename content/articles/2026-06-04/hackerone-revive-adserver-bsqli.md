---
title: "HackerOne: Revive Adserver で Blind SQL Injection 等 3件の脆弱性報告"
source: "HackerOne Hacker Activity"
source_url: "https://hackerone.com/reports/3653196"
published_at: "2026-06-03T00:00:00Z"
summary: "オープンソースの広告配信プラットフォーム Revive Adserver に対して、Blind SQL Injection や Missing Access Control 系の脆弱性報告が立て続けに公開された。"
hits: "OSS の脆弱性報告は Bug Bounty 学習の最高の教材。先輩が CVE-2025-59152（Litestar）で経験した『OSS のメンテナとやりとりして脆弱性を直す』フローと同じ流れがリアルタイムで見られる。Revive Adserver はレガシー PHP 系の挙動が残ってるので、HackTricks 連載 Day 010（SQLi 手動）の教材ケースとして最適。"
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

## 先輩の視点で見ると

### Bug Bounty の引き出しを増やす

- 先輩の CVE-2025-59152 と同じく、**OSS の小さい部分を深掘りすると刺さる**パターン
- レポート3件が連続で出ているということは、報告者が同じ視点で他の箇所も見ている可能性。横展開のお手本

### HackTricks 連載の教材として

- **Day 010（SQLi 手動）** で `clientid` パラメータの Blind SQLi をケーススタディに使える
- **Day 015 周辺（Web 攻撃週）** で Broken Access Control の実例として引用できる

### Smooth / CTO 業務として

- Smooth でアクセス制御の入っているエンドポイント（特に管理画面・CRM）の棚卸し
- レポート2件目「Missing access control when linking trackers to campaigns」は、**N対M の紐付け系API** で起こりがちなパターン

### CVE 報告のお作法として

- HackerOne での公開レポートは、先輩が今後 OSS や企業相手に脆弱性を報告する際のテンプレ集として優秀
- 特に「再現手順をコピペで実行できる粒度で書く」「修正前後の差分を提示する」あたりは MITRE 直接申請の時とは違うお作法が学べる

## アクション提案

- 3件のレポートを順に読む（合計30分）。特に Blind SQLi のレポートで使われている **タイミング攻撃の組み立て方**は手動 SQLi の Day 010 で再利用する
- 自分が報告者ならどう書くか、を頭の中で再構成する練習

---
*詳細は[HackerOne の元レポート](https://hackerone.com/reports/3653196)を参照してください。*
