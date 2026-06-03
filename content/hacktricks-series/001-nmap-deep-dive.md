---
title: "Day 001: Nmap深掘り — OSCPで時間を溶かさないための実戦テク"
source: "chacha_feedly オリジナル連載"
source_url: "https://book.hacktricks.wiki/"
published_at: "2026-06-04T08:00:00Z"
summary: "OSCP本番ではNmapに何分使うかでクリア可否が決まる。Top1000で見落とすポート、スクリプトの選び方、回避とノイズ削減まで、Phase 1のEasy Linuxを安定して落とすための実戦テクを整理する。"
hits: "先輩のCVE-2025-59152は『リバプロ越しの偽装ヘッダ』を見つけた話で、Nmapの-A／-sCで吐かれるバナーから違和感を拾う感性と同根。SmoothのIoT機器（H.VIEW）でShodan/FOFAから候補を絞った調査も、結局は『どのポートが何を喋ってるか』の解像度で勝負が決まる。OSCPはここを30分で終わらせて本番に時間を残せるかどうか。"
category: "Security"
---

# Day 001: Nmap深掘り

OSCPでも実戦でも、**Nmapで何を見落とすかが勝負を決める**。Phase 1のEasy Linuxを安定して落とすために、最低限おさえるべき実戦テクを整理する。

## 1. 「とりあえず-A」を卒業する

初心者あるあるが `nmap -A -T4 target` で全部済ませようとするやつ。これは本番では時間がかかりすぎるし、ノイズも多い。

OSCPで定番なのは **2段階スキャン**:

```bash
# Stage 1: 全ポート高速発見（SYNスキャン）
nmap -p- --min-rate 5000 -T4 -oN nmap-allports.txt 10.10.10.X

# Stage 2: 見つかったポートだけ詳細
nmap -sC -sV -p 22,80,445 -oN nmap-detail.txt 10.10.10.X
```

`--min-rate 5000` は1秒間に5000パケット投げる指定。`-T4` のテンプレ任せより安定して速い。

## 2. UDPを忘れない

OSCPで詰まる原因の3割はこれ。TCPだけ見て「ポート閉じてる」と判断してしまうやつ。

```bash
# よく使うUDPポートだけ先に
sudo nmap -sU --top-ports 50 -T4 10.10.10.X
```

特に SNMP(161)、TFTP(69)、NFS(2049)、IKE(500) はUDP。**ここから刺さるマシンが普通にある**（HTBのSneakyとかね）。

## 3. NSEスクリプトの使い分け

`-sC` は `--script=default` のエイリアス。本気で見るなら個別指定。

```bash
# SMB系を全部叩く
nmap -p 445 --script "smb-* and not brute" 10.10.10.X

# HTTPの基本列挙
nmap -p 80,443 --script "http-title,http-headers,http-methods,http-robots.txt" 10.10.10.X

# vuln系（OSCP的にはやりすぎ注意、目安として）
nmap --script vuln -p 80,443 10.10.10.X
```

`and not brute` は重要。`brute` カテゴリ入れると数十分溶ける。OSCPでは禁止。

## 4. バナーから違和感を拾う

これは**先輩のCVE実績と同根の感性**。`-sV` の出力で:

- バージョン番号が異常に古い（vsftpd 2.3.4 → 即バックドア確定）
- レスポンスヘッダのServerが妙にカスタム（`IPC/2.0.0 openSSL/openSSL0.9.8` ← H.VIEWパターン）
- HTTPS証明書のCNが内部名（vhost候補）
- SSH banner にディストロ名（Debian-1ubuntu0.X → カーネルエクスプロイト候補）

「あ、ここ違う」と感じたら正解の8割。Shodanでバナー検索したのと同じ感性をローカルで使う。

## 5. ステルススキャンとIDS回避（OSCP範囲外だが教養）

OSCPでは制限緩いので不要だが、実戦では:

```bash
# フラグメント化
nmap -f -mtu 16 target

# デコイ
nmap -D RND:10 target

# ソースポート偽装（53/UDPは通りやすい）
nmap --source-port 53 target

# タイミングを遅く
nmap -T1 --scan-delay 5s target
```

OSCPでは `-T4` 全開でOK。本番Pentestや先輩のSmooth Pentest Agentでは制御したい場面が来るはず。

## 6. 出力フォーマット使い分け

```bash
nmap -oA basename target
# basename.nmap (人間用), basename.xml (パース用), basename.gnmap (grep用)
```

`*.gnmap` は `awk` で開いてるポートだけ抜けて便利:

```bash
grep "Ports:" basename.gnmap | awk -F'Ports: ' '{print $2}'
```

OSCPのレポート添付にも `-oA` 推奨。後でスクショ撮り直さなくて済む。

## 7. HTBで実際に使うコマンドテンプレ

```bash
# テンプレ（target変数で使い回し）
target=10.10.10.X
mkdir -p nmap && cd nmap

# Phase 1: 全ポート発見
sudo nmap -p- --min-rate 5000 -T4 -oA allports $target

# Phase 2: 詳細スキャン（Phase 1の結果からポート抽出）
ports=$(grep ^Port allports.gnmap | awk -F'Ports: ' '{print $2}' | tr ',' '\n' | awk -F'/' '{print $1}' | tr '\n' ',' | sed 's/,$//')
sudo nmap -sC -sV -p $ports -oA detail $target

# Phase 3: UDP上位50
sudo nmap -sU --top-ports 50 -T4 -oA udp $target
```

これ覚えると **Easy Linuxは初動5分で固定**できる。残った時間でPrivEscに集中。

## OSCP本番での目安

- 全マシンの初動Nmap: 各15分以内
- 詳細スキャン待ち中に別マシン進める（並行作業）
- 詰まったら `-A` で全部投げ直すより、**個別NSEで深掘り**

## 次回（Day 002）予告

SMB列挙完全攻略。`enum4linux-ng`、`smbclient`、null session、SMB1/2/3の挙動差。
LameやLegacyで毎回出てくるとこなので、ここで詰まらないように整理する。
