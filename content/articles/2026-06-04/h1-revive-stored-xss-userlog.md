---
title: "Revive Adserver: フルネーム欄からのStored XSS"
source: "HackerOne"
source_url: "https://hackerone.com/reports/3669623"
published_at: ""
summary: "ユーザログのメール項目に表示されるFull Name欄を悪用したStored XSSの報告。"
hits: "ユーザ表示名→管理画面コンテキストでXSSはSmoothの管理画面（社内ツール）でも刺さりうる。設計時のサニタイズチェック観点。"
category: "Security"
---

## 何の話か

- Full Name 経由のStored XSS

## アクション提案

- 管理画面の表示先別エスケープルール棚卸し

---
*詳細は[元記事](https://hackerone.com/reports/3669623)を参照してください。*
