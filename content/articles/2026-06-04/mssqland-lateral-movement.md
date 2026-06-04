---
title: "MSSQLand — MS-SQL を使った横展開・ポストエクスプロイト用軽量ツール"
source: "Darknet – Hacking Tools, Hacker News & Cyber Security"
source_url: "https://www.darknet.org.uk/2026/03/mssqland-lightweight-ms-sql-interaction-tool-for-lateral-movement-and-post-exploitation/"
published_at: "2026-03-24T01:00:00Z"
summary: "Red Team が制限された環境下で MS-SQL サーバーやリンクドサーバーと対話するための軽量ツール。複雑な T-SQL クエリを書かずに横展開を実現する Assembly ready のツール。"
hits: "OSCP Phase 3 の Active Directory 攻略で、ドメイン内 MS-SQL サーバが攻撃ベクトルになるパターンがある（HTB の Querier、Resolute など）。Linked Server を辿った横展開は本番試験でも頻出。MSSQLand を頭に入れておくと『どの T-SQL を投げれば良いか』を逆引きで思い出せる教科書になる。"
category: "Security"
---

## 何の話か

Red Team の現場で **MS-SQL サーバーとリンクドサーバーを介した横展開** を支援する軽量ツール「MSSQLand」の紹介記事。

ポイント:
- 制限環境下でも動作する Assembly ready 設計
- 複雑な T-SQL を覚えなくても操作可能
- ポストエクスプロイトの定型動作を抽象化

## なぜ AD 攻略で重要か

Windows 系のエンタープライズ環境では MS-SQL Server がドメインに統合されており、以下のような攻撃面が存在する:

- **xp_cmdshell** によるOSコマンド実行
- **Linked Server** を経由した他DBへの横展開
- **impersonation** を悪用したサービスアカウント奪取
- ドメインアカウントでの認証 → そのままドメイン内のリソース取得

## 先輩の視点で見ると

### OSCP Phase 3（AD）動線として

- HTB の **Querier**（MSSQL → ドメイン奪取）、**Resolute**、**APT** など、AD系マシンで頻繁に登場
- HackTricks 連載 Day 022-028（AD週）で必ず触れるテーマ
- 実機で叩く時間がないなら、ツールの存在と T-SQL の代表クエリだけ頭に入れておく

### Smooth / Bug Bounty 観点

- Smooth は Postgres ベースなので直接の影響は薄い
- ただし顧客環境のセキュリティ診断を受託する可能性が出てきた時に、MS-SQL の知識ゼロだと困る場面はある

### Pentest Agent への応用

- 現状の Smooth Pentest Agent は Web 主体だが、内部ネットワーク侵入後の AD 攻略フェーズを将来追加するなら、こうしたツールの API/CLI ラッパーを実装する形になる

## アクション提案

- ツール本体 GitHub を後で眺める（10分）
- HackTricks 連載 Day 023（Kerberoasting）で MSSQL からの取得経路を紹介する時の参考に

---
*詳細は[元記事](https://www.darknet.org.uk/2026/03/mssqland-lightweight-ms-sql-interaction-tool-for-lateral-movement-and-post-exploitation/)を参照してください。*
