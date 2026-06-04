---
title: "The Fragile Lock: SAML 認証バイパスの新手法（PortSwigger）"
source: "PortSwigger Research"
source_url: "https://portswigger.net/research/the-fragile-lock"
published_at: "2025-12-10T12:32:00Z"
summary: "PortSwigger が Ruby および PHP の SAML エコシステムにおけるパーサーレベルの不整合を悪用した認証バイパス手法を公開。属性汚染、名前空間の混乱など、複数の挙動の差異を組み合わせる手法。"
hits: "SAML/SSO実装の脆弱性研究。認証ライブラリ選定の参考に。"
category: "Security"
---

## 何の話か

PortSwigger の研究者が、SAML（Security Assertion Markup Language、SSO の経営者規格）を実装する Ruby と PHP のライブラリ群で **パーサーの挙動の細かい差** を突いて認証を完全にバイパスする手法を公開した。

ざっくり攻撃の方向性:
- 属性汚染（attribute pollution）
- 名前空間の混乱（namespace confusion）
- 複数パーサーの挙動差を組み合わせる

## なぜ重要か

- SAML は **エンタープライズ SSO の標準**。Google Workspace / Okta / Auth0 などほぼ全部が SAML をサポートしている
- ライブラリ実装のバグなので、**組織が独自実装してなくても影響を受ける**
- 1つの脆弱なライブラリで認証が丸ごと飛ぶ = 完全な ATO（アカウント乗っ取り）

## ポイント

- 公開情報として公開された脆弱性/インシデント事例で、実装側・運用側の両面から参考にできる
- 同種の構造を持つシステムへの横展開リスクを評価する素材として有用
- セキュリティニュースの定点観測ソースとして継続的にウォッチする価値がある

## アクション提案

- PortSwigger 本記事をブックマーク。出張帰りの新幹線で読める分量
- 利用中の認証ライブラリの棚卸し（チーム検討）

---
*詳細は[元記事](https://portswigger.net/research/the-fragile-lock)を参照してください。*
