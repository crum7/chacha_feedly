---
title: "HackerOne: Revive Adserver の trackers→campaigns 紐付けでアクセス制御不備"
source: "HackerOne Hacker Activity"
source_url: "https://hackerone.com/reports/3650582"
published_at: "2026-06-04T11:00:00Z"
summary: "Revive Adserver のトラッカーをキャンペーンに紐付ける操作で権限チェックが抜けていた事案の公開レポート。先のbanner→zone問題と同根。"
hits: "アクセス制御不備の連鎖事例。同パターンの横展開的な発見手法。"
category: "Security"
---

## 何の話か

- トラッカー→キャンペーン紐付けで権限チェック抜け
- 同パターンの不備が複数エンドポイントに連鎖していた可能性

## アクション提案

- ターゲットでも「1個刺さったら同じパターンを横展開して探す」を習慣に

---
*詳細は[元レポート](https://hackerone.com/reports/3650582)を参照してください。*
