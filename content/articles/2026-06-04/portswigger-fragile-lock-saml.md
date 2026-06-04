---
title: "The Fragile Lock: SAML 認証バイパスの新手法（PortSwigger）"
source: "PortSwigger Research"
source_url: "https://portswigger.net/research/the-fragile-lock"
published_at: "2025-12-10T12:32:00Z"
summary: "PortSwigger が Ruby および PHP の SAML エコシステムにおけるパーサーレベルの不整合を悪用した認証バイパス手法を公開。属性汚染、名前空間の混乱など、複数の挙動の差異を組み合わせる手法。"
hits: "認証バイパスは先輩の H.VIEW HV-500S6 で見つけた F-11b（CVSS 9.4 Critical）と同じ系統。SAML は SSO の世界標準で、Smooth の社内ツール認証・取引先連携にも入り込む可能性が高い。CISO 視点で『うちの SAML 実装ライブラリは何使ってる？』を即答できる準備をする良い機会。"
category: "Security"
---

## 何の話か

PortSwigger の研究者が、SAML（Security Assertion Markup Language、SSO の代表規格）を実装する Ruby と PHP のライブラリ群で **パーサーの挙動の細かい差** を突いて認証を完全にバイパスする手法を公開した。

ざっくり攻撃の方向性:
- 属性汚染（attribute pollution）
- 名前空間の混乱（namespace confusion）
- 複数パーサーの挙動差を組み合わせる

## なぜ重要か

- SAML は **エンタープライズ SSO の標準**。Google Workspace / Okta / Auth0 などほぼ全部が SAML をサポートしている
- ライブラリ実装のバグなので、**自社が独自実装してなくても影響を受ける**
- 1つの脆弱なライブラリで認証が丸ごと飛ぶ = 完全な ATO（アカウント乗っ取り）

## 先輩の視点で見ると

### CVE 発見の方法論として

- 先輩の F-11b（H.VIEW の認証なしパスワード上書き）と **構造が同じ**：認証チェックのロジックに穴がある
- PortSwigger のこの研究も「複数の実装の挙動差を比較する」という地味な作業から来ている。先輩が Shodan で同ファームの OEM 系統を分類した感性と同じ

### Smooth / CISO 業務として

- Smooth 自体が SAML を使ってるか確認（Google Workspace 連携などで暗黙的に使っている可能性）
- 取引先の SSO 連携要件で SAML が指定された場合、**どのライブラリ使うかの選定判断**が重要になる

### Bug Bounty 観点

- 同じ系統の脆弱性が他言語実装（Python python3-saml、Java OpenSAML）にも残っている可能性
- 横展開すれば CVE が増やせるネタ

### セキュキャン専門B との接続

- B4（セキュアコーディング）でこの手の「ライブラリ実装のバグ」が題材になる可能性大
- 事前に読んでおくと当日の議論が深くなる

## アクション提案

- PortSwigger 本記事をブックマーク。出張帰りの新幹線で読める分量
- Smooth で使っている認証ライブラリの棚卸し（伊藤さん相談）

---
*詳細は[元記事](https://portswigger.net/research/the-fragile-lock)を参照してください。*
