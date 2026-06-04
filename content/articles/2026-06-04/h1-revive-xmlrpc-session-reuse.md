---
title: "Revive Adserver: Session ID再利用でXML-RPC API認証バイパス"
source: "HackerOne"
source_url: "https://hackerone.com/reports/3672641"
published_at: ""
summary: "Revive AdserverでSession ID再利用によりXML-RPC APIの認証バイパスが可能だったという報告。"
hits: "認証バイパスは先輩のH.VIEW F-11b（CVSS 9.4）と同カテゴリ。セッション管理ミスの典型なのでSmoothのAPI設計レビュー観点として有用。"
category: "Security"
---

## 何の話か

- セッションIDの再利用ミスでAPI認証バイパス

## アクション提案

- Smooth API のセッション管理（無効化タイミング）レビュー

---
*詳細は[元記事](https://hackerone.com/reports/3672641)を参照してください。*
