---
title: "ServerView Agents for Windows に SYSTEM 権限取得可能な脆弱性（CVE-2026-27788, CVE-2026-32325）"
source: "LAC WATCH"
source_url: "https://www.lac.co.jp/lacwatch/alert/20260603_004758.html"
published_at: "2026-06-03T15:00:00+09:00"
summary: "ラックが、エフサステクノロジーズ提供のサーバ管理ソフト ServerView Agents for Windows に、一般ユーザーから SYSTEM 権限で任意コードを実行できる脆弱性を発見・報告した。CVE-2026-27788、CVE-2026-32325。"
hits: "これがまさに OSCP Phase 2-3 の Windows PrivEsc ど真ん中。サービス権限の悪用、不適切な ACL、Unquoted Service Path などの古典パターンを企業向け製品で実際に発見した事例として、ラックの報告書をベンチマークにできる。先輩自身の CVE 報告フロー（MITRE申請、CC/CERT調整）と並べて『日本企業がやっているCVE報告の作法』として読むと血肉になる。"
category: "Security"
---

## 何の話か

ラックの研究者が、富士通系のエフサステクノロジーズが提供する **ServerView Agents for Windows**（サーバ監視・管理エージェント）に重大な脆弱性2件を発見し、CVE が割り当てられた。

- CVE-2026-27788
- CVE-2026-32325

いずれも **一般ユーザー権限から SYSTEM 権限で任意コード実行が可能**になる典型的なローカル特権昇格（LPE）系。

## なぜインパクトが大きいか

- ServerView Agents はサーバの監視・管理用に **デフォルトで SYSTEM 権限で動くサービス** が多い
- 一般ユーザーが踏み台になった時点で、攻撃者は **そのサーバの完全制御を取れる**
- 企業向けのプリインストール製品なので、影響範囲が広い

## 先輩の視点で見ると

### OSCP 動線として

- **Phase 2-3 の Windows PrivEsc 演習** で出てくるパターンそのもの
  - サービス権限の悪用
  - 不適切な ACL
  - DLL ハイジャック
  - Unquoted Service Path
- HTB の Windows マシン（特に Easy/Medium）で出題されるテクとほぼ同じ

### CVE 報告のお作法として

- 先輩の CVE-2025-59152、H.VIEW HV-500S6 の MITRE 申請フローと並べて読むと面白い
- 日本の大手SIerの研究部門がどう CVE を取りに行くかのリファレンスになる

### Smooth の運用として

- Smooth は基本 GCP Cloud Run（Linux コンテナ）なので直接の影響は薄いはず
- ただし社内 PC や開発端末で同系統の管理ソフトが入っている可能性は確認の価値あり

## アクション提案

- ラックの一次情報を読んで、検出ロジック（どうやって脆弱性に気づいたか）の部分を頭に入れる
- CVE 詳細: NVD で CVE-2026-27788 / CVE-2026-32325 を検索すれば英語版の情報も取れる

---
*詳細は[元記事](https://www.lac.co.jp/lacwatch/alert/20260603_004758.html)を参照してください。*
