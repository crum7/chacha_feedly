---
title: "Cookie Chaos: __Host / __Secure プレフィックスのバイパス"
source: "PortSwigger Research"
source_url: "https://portswigger.net/research/cookie-chaos-how-to-bypass-host-and-secure-cookie-prefixes"
published_at: "2025-09-03T14:46:23Z"
summary: "ブラウザがセッション保護のために導入したCookieプレフィックス（__Host, __Secure）を、ブラウザとサーバの解釈差を使ってバイパスする手法の解説。"
hits: "SmoothのCookie設計（特にAdmin系）でこの種のバイパス耐性チェック対象。Bug Bounty実戦のネタにも。"
category: "Security"
---

## 何の話か

- __Host/__Secure Cookie保護のバイパス
- Browser/Server解釈差を利用

## アクション提案

- Smooth Admin系のCookie属性レビュー

---
*詳細は[元記事](https://portswigger.net/research/cookie-chaos-how-to-bypass-host-and-secure-cookie-prefixes)を参照してください。*
