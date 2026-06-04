---
title: "HackerOne: Revive Adserver の banners/campaigns→zones 紐付けでアクセス制御不備"
source: "HackerOne Hacker Activity"
source_url: "https://hackerone.com/reports/3650504"
published_at: "2026-06-04T11:00:00Z"
summary: "Revive Adserver で、バナーやキャンペーンをゾーンに紐付ける操作で権限チェックが抜けていた事案の公開レポート。"
hits: "N対M紐付けエンドポイントで認可漏れが起きるのは王道パターン。Smoothの管理画面で『駐車場×端末』『法人×契約』など対多関係のAPIがある箇所を棚卸す合図になる。"
category: "Security"
---

## 何の話か

- バナー/キャンペーンをゾーンに紐付ける際の権限チェック漏れ
- 他組織のリソースに勝手に紐付け可能だったタイプの IDOR

## アクション提案

- Smooth管理画面のN対M紐付けAPIをリストアップ
- HackTricks Day 015 (Broken Access Control) の教材ケースに

---
*詳細は[元レポート](https://hackerone.com/reports/3650504)を参照してください。*
