# HackTricks連載カリキュラム（OSCP範囲のロードマップ）

毎日1本、30日で網羅。OSCP範囲（Phase 1-4）に合わせた順序。
HackTricksをベースに、実際の試験で使えるテクとコマンド例に絞る。

## Week 1: Enumeration基礎（Phase 1 Easy Linux対応）

| Day | テーマ | 元ネタHackTricksパス |
|-----|--------|---------------------|
| 001 | Nmap深掘り（スクリプト・タイミング・回避） | src/network-services-pentesting/pentesting-network/index.md |
| 002 | SMB列挙（enum4linux、smbclient、null session） | src/network-services-pentesting/pentesting-smb/ |
| 003 | FTP/anonymous、vsftpd系の落とし穴 | src/network-services-pentesting/pentesting-ftp/ |
| 004 | SSH列挙とユーザー名特定 | src/network-services-pentesting/pentesting-ssh.md |
| 005 | HTTP列挙（gobuster、feroxbuster、vhost） | src/network-services-pentesting/pentesting-web/ |
| 006 | SNMP / SNMPwalk | src/network-services-pentesting/pentesting-snmp/ |
| 007 | NFS exports悪用 | src/network-services-pentesting/nfs-service-pentesting.md |

## Week 2: Web攻撃（Easy/Medium全般）

| Day | テーマ |
|-----|--------|
| 008 | LFI/RFI実戦（log poisoning、wrapper） |
| 009 | ファイルアップロード回避テク（拡張子、Content-Type、magic bytes） |
| 010 | SQLi手動（UNION、Blind、Time-based） |
| 011 | SSRF基礎（cloud metadata、gopher、内部スキャン） |
| 012 | XXE（OOB、blind、parameter entity） |
| 013 | Command Injection（bypass技集） |
| 014 | デシリアライゼーション入門（Python pickle、PHP unserialize） |

## Week 3: PrivEsc Linux/Windows（Phase 2-3）

| Day | テーマ |
|-----|--------|
| 015 | Linux PrivEsc: SUID/SGID 完全攻略 |
| 016 | sudo -l ワナ集（GTFOBins活用） |
| 017 | Cron悪用（PATH、wildcard injection） |
| 018 | Capabilities（cap_setuid等） |
| 019 | Windows PrivEsc: サービス権限・Registry |
| 020 | Unquoted Service Path |
| 021 | Token Impersonation（SeImpersonatePrivilege、Potato系） |

## Week 4: Active Directory（Phase 3メイン）

| Day | テーマ |
|-----|--------|
| 022 | AD列挙（BloodHound、ldapsearch、PowerView） |
| 023 | Kerberoasting |
| 024 | AS-REP Roasting |
| 025 | NTLM Relay（ntlmrelayx、Coerce） |
| 026 | Pass-the-Hash / Pass-the-Ticket |
| 027 | DCSync |
| 028 | Constrained / Unconstrained Delegation |

## Week 5+: 試験直前（Phase 4）

| Day | テーマ |
|-----|--------|
| 029 | ピボット・ポートフォワード（chisel、ligolo-ng、sshuttle） |
| 030 | バッファオーバーフロー復習（試験範囲外だが教養） |

## 書き方の方針

- HackTricksの原文を翻訳しつつ、**実戦で使える形に再構成**
- 必ず **OSCPの試験で何点稼げるか**の視点を入れる
- コマンドはコピペで動く形で
- HTBのマシン名と紐付けて「これはLameで使う」「これはForestで使う」と明示
