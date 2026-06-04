---
title: "フィッシング対策協議会、フィッシングレポート2026と対策ガイドライン改定版を公開"
source: "フィッシング対策協議会"
source_url: "https://www.antiphishing.jp/news/info/press_phishing_report2026.html"
published_at: "2026-06-01T07:28:28Z"
summary: "フィッシング対策協議会の技術・制度検討ワーキンググループが、2025年度の動向をまとめたフィッシングレポート2026と、事業者向け・利用者向けの対策ガイドラインの2026年度版を公開した。"
hits: "Smoothはエンドユーザーが直接料金支払いに来る駐車場アプリ。フィッシングの最新動向と推奨対策（DMARC, BIMI, パスキー）はそのままセキュリティ実装の判断材料になる。CISOとして『日本の業界団体が今年何を推奨してるか』をワンメッセージで言えると、CS対応・取引先説明・社内教育がスムーズ。"
category: "Security"
---

## 何の話か

日本のフィッシング対策の業界団体である **フィッシング対策協議会** が2つ大きい資料を公開。

1. **フィッシングレポート 2026** — 2025年度の被害状況・攻撃手法のまとめ
2. **フィッシング対策ガイドライン 2026年度版** — 事業者向け・利用者向けの実装推奨

## なぜ毎年見るべきか

- 日本国内のフィッシング動向（手口・件数・狙われる業種）が定量データで分かる
- 事業者向けガイドラインは **DMARC、BIMI、パスキー、SMS認証の代替手段** など、その年に「推奨」が変わる箇所が明示される
- 法規制やJPCERT/CCの動きとも連動するので、社内ポリシーの根拠資料として使える

## 先輩の視点で見ると

- **Smooth の決済・サポートメール送信ドメイン** で DMARC ポリシーが `reject` まで上げられてるか棚卸しの良いタイミング
- **CS Bot や AI CS** がエンドユーザーとやり取りする際の「公式な連絡経路はどれか」を明示する設計に活きる
- **SecHack365 / セキュキャン専門B** の文脈でも、日本のプロダクトセキュリティ実装の標準ドキュメントとして引用元になる

## アクション提案

- 事業者向けガイドライン: https://www.antiphishing.jp/report/guideline/antiphishing_guideline2026.html
- 利用者向けガイドライン: https://www.antiphishing.jp/report/guideline/consumer_guideline2026.html
- レポート全文: https://www.antiphishing.jp/report/wg/phishing_report2026.html

Smoothのインフラ担当（伊藤さん or 後藤さん）に DMARC の現状ポリシーだけ確認しておくと、次の機会に即動ける。

---
*詳細は[元記事](https://www.antiphishing.jp/news/info/press_phishing_report2026.html)を参照してください。*
