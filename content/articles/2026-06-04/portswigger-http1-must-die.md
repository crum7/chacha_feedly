---
title: "HTTP/1.1 must die: desync攻撃のエンドゲーム"
source: "PortSwigger Research"
source_url: "https://portswigger.net/research/http1-must-die"
published_at: "2025-08-06T22:20:00Z"
summary: "アップストリームHTTP/1.1は本質的に安全でなく、6年間の緩和策にも関わらず数百万サイトが乗っ取りリスクに晒されているとするJames Kettleの主張。Request Smuggling系の集大成。"
hits: "Smoothの前段（Cloud Run/LB）でのHTTP実装パスの把握は重要。CTOとしてインフラ更改判断の材料に。"
category: "Security"
---

## 何の話か

- HTTP/1.1の本質的脆弱性論
- HTTP/2 upstream強制を提唱

## アクション提案

- Smoothの上流通信プロトコル棚卸し
- GCP LBのHTTP/2強制可能性検討

---
*詳細は[元記事](https://portswigger.net/research/http1-must-die)を参照してください。*
