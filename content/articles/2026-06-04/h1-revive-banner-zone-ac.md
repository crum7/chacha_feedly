---
title: "HackerOne: Revive Adserver の banners/campaigns→zones 紐付けでアクセス制御不備"
source: "HackerOne Hacker Activity"
source_url: "https://hackerone.com/reports/3650504"
published_at: "2026-06-04T11:00:00Z"
summary: "Revive Adserver で、バナーやキャンペーンをゾーンに紐付ける操作で権限チェックが抜けていた事案の公開レポート。"
hits: "N対M紐付けエンドポイントの典型的な認可漏れ事例。"
category: "Security"
---

## 何の話か

- バナー/キャンペーンをゾーンに紐付ける際の権限チェック漏れ
- 他組織のリソースに勝手に紐付け可能だったタイプの IDOR

## アクション提案

- 管理画面の多対多紐付けAPIの認可チェックを棚卸し
- HackTricks Day 015 (Broken Access Control) の教材ケースに

---
*詳細は[元レポート](https://hackerone.com/reports/3650504)を参照してください。*
