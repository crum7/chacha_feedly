---
title: "Cisco Unified CM にクリティカル脆弱性、PoCも公開済み"
source: "Security NEXT"
source_url: "https://www.security-next.com/185385"
published_at: "2026-06-03T23:51:32Z"
summary: "Ciscoが企業向け統合コミュニケーション基盤 Unified Communications Manager の脆弱性についてアップデート公開。すでに概念実証コード (PoC) も世に出ており、重要度は最高位の Critical に引き上げられた。"
hits: "認証バイパスやリモート実行系がPoC付きで出回ると、SmoothのSlack/電話連携や法人IP電話を使ってる客先で『社内通話インフラが乗っ取られたら何が漏れる？』という会話が来る。CTOとして『Cisco Unified CMがクリティカル、PoCあり、即パッチ』をワンメッセージで言えるだけで安心感が違う。"
category: "Security"
---

## 何の話か

Cisco の Unified Communications Manager（IP電話・ビデオ会議の中枢サーバ）に重大な脆弱性が確認され、当初の評価から **Critical（最高位）** へ引き上げられた、というニュース。

PoC（攻撃の概念実証コード）がすでに公開されているため、攻撃者が手を動かし始める前にアップデート適用が必要な状態。

## ざっくりインパクト

- 影響対象: Cisco Unified CM を運用している企業（IP電話・ビデオ通話基盤）
- 公開状況: PoC 公開済み → 武器化までの猶予が短い
- 対応: ベンダ提供のアップデート適用

詳細な CVE 番号や CVSS、影響バージョンは元記事側の本文で確認してください（[元記事](https://www.security-next.com/185385)）。

## 先輩の視点で見ると

- **Smooth の顧客で「うちの社内電話、Cisco だっけ？」が話題になる可能性**。CTOとして、対応窓口候補（社内IT or 外部SIer）を一行で答えられる準備を
- **CVE実績の文脈** で見ると、これも「企業向け基盤製品 × 認証/コード実行系」のパターン。先輩がH.VIEWで見つけた構造（外部公開デバイスに認証回りのスキがある）と同じ系統
- **PoC が先に出るパターン** は最近多い。Smooth Pentest Agent のテストシナリオに「PoC公開後24時間以内に検知できるか」を入れる価値あり

## アクション提案

- 自宅ラボに Cisco Unified CM が無いなら一次情報を読むだけでOK
- 顧客対応の温度感だけ把握: 「Critical+PoC公開済み」「アップデートあり」とまず言えれば十分

---
*この記事は要約＋解説です。詳細は[元記事](https://www.security-next.com/185385)を参照してください。*
