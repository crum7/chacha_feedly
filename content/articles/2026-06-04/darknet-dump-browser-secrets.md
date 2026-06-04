---
title: "DumpBrowserSecrets: App-Bound Encryption回避でブラウザ認証情報窃取"
source: "Darknet"
source_url: "https://www.darknet.org.uk/2026/03/dumpbrowsersecrets-browser-credential-harvesting-with-app-bound-encryption-bypass/"
published_at: "2026-03-09T01:00:00Z"
summary: "Chrome/Edge/Firefox/Opera/Vivaldi等から、保存パスワード・Cookie・OAuthトークン・自動入力データを、Early Bird APC injectionでApp-Bound Encryptionをバイパスして抜き取るツール。"
hits: "ChromeのABE回避は2025-26年Infostealerの主戦場。OSCP/赤チーム視点のラボ題材として価値最大。Smoothの端末セキュリティ要件議論の材料にも。"
category: "Security"
---

## 何の話か

- ABEを回避してブラウザ秘密を抽出
- 主要ブラウザ全部対象

## アクション提案

- 検証環境で挙動再現してEDR反応確認
- BYOD端末でブラウザにパスワード保存禁止の根拠資料に

---
*詳細は[元記事](https://www.darknet.org.uk/2026/03/dumpbrowsersecrets-browser-credential-harvesting-with-app-bound-encryption-bypass/)を参照してください。*
