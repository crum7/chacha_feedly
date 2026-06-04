---
title: "PortSwigger Top 10 Web Hacking Techniques of 2025"
source: "PortSwigger Research"
source_url: "https://portswigger.net/research/top-10-web-hacking-techniques-of-2025"
published_at: "2026-02-05T15:28:08Z"
summary: "PortSwigger（Burp Suite開発元）が毎年恒例の『Top 10 Web Hacking Techniques』2025年版を公開。コミュニティ投票で選ばれた、その年の最も革新的なWebセキュリティ研究のリスト。19回目。"
hits: "Burp Suite Pro 持ちで Bug Bounty 視野の先輩には必読。ここに乗ったテクは翌年の SoTA（最先端技術）として研究者全員が追いかけるので、先回りで読んでおくと CVE 発見の引き出しが増える。SecHack365 / セキュキャン専門B の B5（ASM）B6（サプライチェーン）の議論にも直結する。"
category: "Security"
---

## 何の話か

PortSwigger が毎年公開している **その年のWebハッキング技術トップ10** の2025年版。コミュニティ投票で選ばれる、いわば Web セキュリティ研究の Oscar 賞。

PortSwigger の James Kettle 含む研究者陣がノミネートを審査し、コミュニティ投票でランクが決まる仕組み。

## なぜ必読か

- **その年の SoTA（最先端）が一覧でわかる**。来年以降の研究の起点
- **Bug Bounty の引き出しが直接増える**。トップ10入りした手法はその後1〜2年は実戦で刺さる
- **Burp Suite に新機能として取り込まれる**ことも多い。Pro ライセンス持ちなら知っておくと使い倒せる

## 先輩の視点で見ると

### Bug Bounty 観点

- 先輩が CVE-2025-59152（Litestar の X-Forwarded-For 偽装）で見つけた構造は、PortSwigger 系の **HTTP Request Smuggling / Header Confusion** 研究と地続き
- トップ10入りした手法を自分の対象アプリ（Smooth, OSS）に当てはめる、を回すと CVE 候補が見つかる

### セキュキャン専門B との接続

- B5（ASM）の市川さんの議論に「攻撃者の偵察手法」が出てくるはず。PortSwigger Top10 は **攻撃者側が今年実際に使った手法のキュレーション**として最良の素材
- B4（バグバウンティ）の飯沼さんの講義の事前学習にも最適

### Smooth Pentest Agent

- Nuclei テンプレが追従していない新手法があれば、自前テンプレ化のネタになる
- Brain（Qwen3 8B）に「この攻撃手法を Smooth 環境に当てはめると？」と問うのに使える

## アクション提案

- PortSwigger 本ページを開いてトップ10を眺める（15分）
- 興味あるエントリ1-2件の詳細ブログを後で読む
- セキュキャン直前（8月）に再読する

---
*詳細は[元記事](https://portswigger.net/research/top-10-web-hacking-techniques-of-2025)を参照してください。*
