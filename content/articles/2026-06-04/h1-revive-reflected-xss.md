---
title: "HackerOne: Revive Adserver の zone-include.php に Reflected XSS"
source: "HackerOne Hacker Activity"
source_url: "https://hackerone.com/reports/3653316"
published_at: "2026-06-04T11:00:00Z"
summary: "Revive Adserverの同じエンドポイント (zone-include.php) のclientidパラメータでReflected XSSが報告された。同じ箇所にBlind SQLiも別レポートで報告済み。"
hits: "XSS研究の最新事例。実装側のレビュー観点として。"
category: "Security"
---

## 何の話か

- zone-include.php の clientid パラメータが未サニタイズ
- 同じパラメータで Blind SQLi（別レポート）と Reflected XSS の両方が成立

## アクション提案

- 1パラメータに対する複数攻撃ベクトル（XSS/SQLi/Path Traversal/Command Injection）を順に試す習慣
- HackTricks Day 010, 015 の参考例として収録

---
*詳細は[元レポート](https://hackerone.com/reports/3653316)を参照してください。*
