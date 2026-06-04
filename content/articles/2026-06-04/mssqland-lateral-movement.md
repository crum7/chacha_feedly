---
title: "MSSQLand — MS-SQL を使った横展開・ポストエクスプロイト用軽量ツール"
source: "Darknet – Hacking Tools, Hacker News & Cyber Security"
source_url: "https://www.darknet.org.uk/2026/03/mssqland-lightweight-ms-sql-interaction-tool-for-lateral-movement-and-post-exploitation/"
published_at: "2026-03-24T01:00:00Z"
summary: "Red Team が制限された環境下で MS-SQL サーバーやリンクドサーバーと対話するための軽量ツール。複雑な T-SQL クエリを書かずに横展開を実現する Assembly ready のツール。"
hits: "ラテラルムーブメント手法の研究事例。Blue Team観点での検知設計に。"
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

## ポイント

- 公開情報として公開された脆弱性/インシデント事例で、実装側・運用側の両面から参考にできる
- 同種の構造を持つシステムへの横展開リスクを評価する素材として有用
- セキュリティニュースの定点観測ソースとして継続的にウォッチする価値がある

## アクション提案

- ツール本体 GitHub を後で眺める（10分）
- Web攻撃の学習トピックで MSSQL からの取得経路を紹介する時の参考に

---
*詳細は[元記事](https://www.darknet.org.uk/2026/03/mssqland-lightweight-ms-sql-interaction-tool-for-lateral-movement-and-post-exploitation/)を参照してください。*
