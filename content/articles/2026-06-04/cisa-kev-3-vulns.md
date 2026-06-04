---
title: "米CISAが3件の脆弱性を悪用カタログ（KEV）に追加、Linuxカーネル含む"
source: "Security NEXT"
source_url: "https://www.security-next.com/185392"
published_at: "2026-06-04T00:20:46Z"
summary: "米CISAが Known Exploited Vulnerabilities (KEV) カタログに3件を追加し、Linuxカーネル系も含まれる。すでに悪用が観測されているため早期対応を呼びかけている。"
hits: "KEVに乗った瞬間に『これは実戦投入されている脆弱性です』と公的に証明される。先輩がOSCPで触るLinux PrivEsc系がここに乗る = 試験で出るかどうかとは別軸で『今攻撃者が使ってる手』として頭に入れる価値がある。CTOとして米連邦の方針に沿った『KEV追従パッチ運用』を社内ポリシーに入れるかどうかも判断材料になる。"
category: "Security"
---

## 何の話か

米CISA（サイバーセキュリティ・インフラセキュリティ庁）が、悪用が確認された脆弱性をまとめた **Known Exploited Vulnerabilities (KEV) カタログ**に新たに3件を追加した。Linuxカーネル系の脆弱性も含まれる。

KEVに掲載されると、米連邦機関は強制的なパッチ期限が設定される。民間でも事実上の「いま攻撃者が使ってる手」リストとして参照される。

## なぜKEV追加が重要か

- KEV掲載 = **理論上の脆弱性ではなく実際に悪用が観測されている**証拠
- パッチ優先度のシグナルとしてグローバルに使われる
- IPSやEDRのシグネチャ反映が早まる

## 先輩の視点で見ると

- **OSCP Phase 2-3 のLinux PrivEsc** で触る系の脆弱性がKEVに乗ると、「教科書知識」と「現役の攻撃手段」が直結する。試験対策と実戦感覚が同期する瞬間
- **Smooth のCloud Run 環境**は Linux ベース。KEV に乗ってる Linux カーネルの脆弱性が、コンテナ脱出（container escape）に使われる系統なら影響範囲を確認すべき
- **Pentest Agent のテンプレ更新シグナル**としても KEV は使いやすい。週次でCISA RSSを購読、KEV追加があったらNucleiテンプレが対応してるかチェック、という自動化が組める

## アクション提案

- CISA KEV カタログ: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- Smooth 本番環境のホストOS/カーネルバージョンを把握しておくと、KEV追加時に即座に影響有無を判断できる

---
*詳細は[元記事](https://www.security-next.com/185392)を参照してください。*
