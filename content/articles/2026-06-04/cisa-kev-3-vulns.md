---
title: "米CISAが3件の脆弱性を悪用カタログ（KEV）に追加、Linuxカーネル含む"
source: "Security NEXT"
source_url: "https://www.security-next.com/185392"
published_at: "2026-06-04T00:20:46Z"
summary: "米CISAが Known Exploited Vulnerabilities (KEV) カタログに3件を追加し、Linuxカーネル系も含まれる。すでに悪用が観測されているため早期対応を呼びかけている。"
hits: "CISA KEV掲載の悪用観測脆弱性。パッチ優先度判断の指標。"
category: "Security"
---

## 何の話か

米CISA（サイバーセキュリティ・インフラセキュリティ庁）が、悪用が確認された脆弱性をまとめた **Known Exploited Vulnerabilities (KEV) カタログ**に新たに3件を追加した。Linuxカーネル系の脆弱性も含まれる。

KEVに掲載されると、米連邦機関は強制的なパッチ期限が設定される。民間でも事実上の「いま攻撃者が使ってる手」リストとして参照される。

## なぜKEV追加が重要か

- KEV掲載 = **理論上の脆弱性ではなく実際に悪用が観測されている**証拠
- パッチ優先度のシグナルとしてグローバルに使われる
- IPSやEDRのシグネチャ反映が早まる

## ポイント

- 公開情報として公開された脆弱性/インシデント事例で、実装側・運用側の両面から参考にできる
- 同種の構造を持つシステムへの横展開リスクを評価する素材として有用
- セキュリティニュースの定点観測ソースとして継続的にウォッチする価値がある

## アクション提案

- CISA KEV カタログ: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- 本番環境のホストOS/カーネルバージョンを把握しておくと、KEV追加時に即座に影響有無を判断できる

---
*詳細は[元記事](https://www.security-next.com/185392)を参照してください。*
