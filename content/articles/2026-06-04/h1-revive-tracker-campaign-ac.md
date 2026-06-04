---
title: "HackerOne: Revive Adserver の trackers→campaigns 紐付けでアクセス制御不備"
source: "HackerOne Hacker Activity"
source_url: "https://hackerone.com/reports/3650582"
published_at: "2026-06-04T11:00:00Z"
summary: "Revive Adserver のトラッカーをキャンペーンに紐付ける操作で権限チェックが抜けていた事案の公開レポート。先のbanner→zone問題と同根。"
hits: "同じレポーターが系統的に攻めているように見える。バグハント観点で『同じパターンの脆弱性が同一プロジェクト内に横展開している箇所』を探すムーブのお手本。"
category: "Security"
---

## 何の話か

- トラッカー→キャンペーン紐付けで権限チェック抜け
- 同パターンの不備が複数エンドポイントに連鎖していた可能性

## アクション提案

- 自分のターゲットでも「1個刺さったら同じパターンを横展開して探す」を習慣に

---
*詳細は[元レポート](https://hackerone.com/reports/3650582)を参照してください。*
