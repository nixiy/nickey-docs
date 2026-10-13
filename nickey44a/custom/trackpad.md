---
layout: default
title: Nickey44A トラックパッド
description: Nickey44Aにトラックパッドを追加するための部品・改造方法・Firmware書き込みのガイド
image: /nickey44a/custom/images/trackpad-overview.jpg
permalink: /nickey44a/custom/trackpad/
---

# Nickey44A トラックパッド

Nickey44Aへトラックパッドを追加するためのガイドです。必要な部品、取り付け・配線、対応Firmwareの書き込み、動作確認をまとめます。

![左右にトラックパッドを取り付けたNickey44A]({{ '/nickey44a/custom/images/trackpad-overview.jpg' | relative_url }})

左右にトラックパッドを取り付けた例です。

> このページは現在準備中です。具体的な手順や写真は順次追加します。

## 対応条件
<!-- TODO: 対応する基板バージョン、XIAOの種類、デバイス型番、取り付け側、ケースを記載 -->

<!-- TODO: 必要な部品を確定し、表の項目・数量・入手先を更新 -->

<!-- TODO: デバイス本体、配線・コネクター、固定部品、専用ケースなどの型番・数量・入手先を記載 -->
<!-- TODO: 標準の組み立てに加えて必要になる道具を記載 -->

## 基板バージョン別の手順

基板裏面下部に記載のバージョンを参照し、改造方法とFirmwareの手順を確認してください。

<div class="version-tabs" data-version-tabs>
  <div class="version-tabs__list" aria-label="基板バージョン" hidden>
    <button type="button" id="trackpad-tab-ver1.1" data-version-tab aria-controls="trackpad-ver1.1">Ver1.1</button>
    <button type="button" id="trackpad-tab-ver2" data-version-tab aria-controls="trackpad-ver2">Ver2</button>
  </div>

<div class="version-tabs__panel" id="trackpad-ver1.1" data-version-panel markdown="1">

### Ver1.1

<!-- TODO: Ver1の対応可否・必要なXIAO・制約を記載 -->

#### 必要な部品・道具

| 部品 | 型番 | 数量 | 入手先例 | 備考 |
| --- | --- | ---: | --- | --- |
| トラックパッド本体 | TPS43-201A-S | 2 | [マルツ](https://www.marutsu.co.jp/pc/i/25650684/), [DigiKey](https://www.digikey.jp/ja/products/detail/azoteq-pty-ltd/TPS43-201A-S/7164940) | |
| トラックパッド用プレート | -| 2 | [BOOTH](https://booth.pm/ja/items/4785113) |調達できなければ3DP製のプレートを貼る |
| 配線・コネクター | ピッチ変換FPC（6ピン） | 2 | [BOOTH](https://booth.pm/ja/items/8265223) | |
| 電線ケーブル | 太さ30AWG | 1 | [Amazon](https://www.amazon.co.jp/dp/B0CRHVB4JK) |7色入ってるので色分けしやすい |
| 対応ケース・プレート | - | - | boothからDLできるファイル名を記載 | |


#### ケース・基板の準備

電源をOFFにし、電池とUSBケーブルを外してから作業します。標準ケースから基板を取り出し、トラックパッド用のボトムケースとトッププレートを用意してください。

#### 取り付け・配線

![Nickey44A Ver1.1のトラックパッド用FPCと基板の配線例]({{ '/nickey44a/custom/images/trackpad-ver1-1-wiring.jpg' | relative_url }})

RST（フレキ側のNRST）とRDYは、基板側のパッドを経由せず、XIAO表面右下の隠しGPIOパッドから直接配線します。

| 信号 | XIAO側の接続先 | 配線色 |
| --- | --- | --- |
| RST（NRST） | P0.16 | 白⬜️ |
| RDY | P1.10 | 黄🟨 |


**ピン番号は、上の配線写真の向きで左から順に1〜6番です。**

| ピン番号 | 基板側 | フレキ側(配線色) |
| --- | --- | --- |
| 1 | GND:黒⬛️ | SDA:緑🟩 |
| 2 | SDA:緑🟩（P0.09） | SCL:青🟦 |
| 3 | SCL:青🟦（P0.10） | VDDHI:赤🟥 |
| 4 | - | GND:黒⬛️ |
| 5 | - | NRST:白⬜️ |
| 6 | 3.3V:赤🟥 | RDY:黄🟨 |

<!-- TODO: 取り付け位置、固定方法、配線図、接続先のパッド・ピン名を写真付きで記載 -->

#### 組み付け前の確認

上の配線表と照合し、接続先とはんだ付けの状態を確認してください。隣り合う端子がはんだでつながっていないこと、FPCがコネクターから抜けていないことを確認してからケースへ組み付けます。

#### ケースの組み立て

以下はVer1.1の片側の組立例です。

##### 1. パーツを用意する

ボトムケース、トラックパッド用トッププレート、配線済みの基板とTPS43、ケース固定用のネジを用意します。

![トラックパッド用ケース、トッププレート、配線済みの基板とTPS43、固定用ネジ]({{ '/nickey44a/custom/images/assembly/01-case-parts.jpg' | relative_url }})

##### 2. TPS43の接続を確認する

TPS43裏面のFPCと配線の状態を確認します。組み立て中はTPS43本体を支え、電線やFPCを引っ張らないようにしてください。

![TPS43裏面のFPCとNickey44A基板への配線]({{ '/nickey44a/custom/images/assembly/02-tps43-connection-check.jpg' | relative_url }})

##### 3. 基板をボトムケースに収める

XIAOのUSB端子とケースの開口部を合わせ、基板をボトムケースに収めます。TPS43はまだ取り付けず、ケースの外側で支えておきます。

![ボトムケースに基板を収め、TPS43をケースの外側に置いた状態]({{ '/nickey44a/custom/images/assembly/03-pcb-seated-in-bottom-case.jpg' | relative_url }})

##### 4. トッププレートを被せる

基板の上にトッププレートを被せ、スイッチ穴とネジ穴の位置を合わせます。電線をケースとプレートの間に挟まないよう、トラックパッドの取り付け部分へ収めてください。

![基板の上にトラックパッド用トッププレートを被せた状態]({{ '/nickey44a/custom/images/assembly/04-top-plate-positioned.jpg' | relative_url }})

##### 5. TPS43の向きを確認する

タッチ面が上、緑色の基板面がケースの内側になる向きで取り付けます。写真を参考にFPCと電線を内側へ収め、折り返したときに突っ張ったり、取り付け枠に挟まったりしないことを確認してください。

![TPS43を立てて裏面の向きとFPCの収まりを確認している状態]({{ '/nickey44a/custom/images/assembly/05-tps43-orientation.jpg' | relative_url }})

##### 6. TPS43の片側をはめる

TPS43を斜めにして、片側の縁を取り付け枠にはめます。写真のように反対側を浮かせた状態で、FPCと電線が内側に収まっていることを確認します。

![TPS43の片側を取り付け枠にはめ、反対側を浮かせた状態]({{ '/nickey44a/custom/images/assembly/06-tps43-first-edge-inserted.jpg' | relative_url }})

##### 7. TPS43の反対側をはめる

浮いている側をゆっくり下ろし、反対側の縁も枠にはめます。四隅が収まり、タッチ面が傾いたり浮いたりしていないことを確認してください。入りにくい場合は無理に押し込まず、配線の挟み込みや位置ずれを確認します。

![TPS43の両側を取り付け枠にはめ、タッチ面が収まった状態]({{ '/nickey44a/custom/images/assembly/07-tps43-seated-in-frame.jpg' | relative_url }})

##### 8. 表面のネジを締める

トッププレート表の5箇所のネジを締めて下さい。

##### 9. 底面のネジを締める

TPS43とトッププレートが外れないように支えながらケースを裏返し、底面から固定用のネジを締めます。ケースに隙間がないことを確認し、締めすぎないようにしてください。

![底面の固定用ネジを締めたトラックパッド用ケース]({{ '/nickey44a/custom/images/assembly/08-bottom-case-screw-secured.jpg' | relative_url }})

#### Firmware

##### 対応Firmwareの入手

[TPS43ブランチ](https://github.com/nixiy/zmk-config-nickey44a/tree/tps43) を参照し、ForkしてGithub ActionでFWをビルドして下さい。後日FWのuf.2をリポジトリに置いておきます

<!-- TODO: 配布先、対応バージョン、左右それぞれのUF2ファイル名を記載 -->
<!-- TODO: 自分でビルドする場合のリポジトリ、ブランチ、設定変更、ビルド対象を記載 -->

##### Firmwareの書き込み

UF2を書き込む基本操作は、[Firmwareの書き込み方法]({{ '/guides/firmware/' | relative_url }})を参照してください。

<!-- TODO: 左右への書き込み順序、settings_resetの要否、書き込み後の再接続手順を記載 -->

</div>

<div class="version-tabs__panel" id="trackpad-ver2" data-version-panel markdown="1">

### Ver2

#### 必要な部品・道具

| 部品 | 型番 | 数量 | 入手先例 | 備考 |
| --- | --- | ---: | --- | --- |
| トラックパッド本体 | TPS43-201A-S | 2 | [マルツ](https://www.marutsu.co.jp/pc/i/25650684/) | |
| トラックパッド用プレート | -| 2 | [BOOTH](https://booth.pm/ja/items/4785113) |調達できなければ3DP製のプレートを貼る |
| 配線・コネクター | ピッチ変換FPC（6ピン） | 2 | [BOOTH](https://booth.pm/ja/items/8265223) | |
| 電線ケーブル | 太さ30AWG | 1 | [Amazon](https://www.amazon.co.jp/dp/B0CRHVB4JK) |7色入ってるので色分けしやすい |
| 対応ケース・プレート | 未記載 | 未記載 | boothからDLできるファイル名を記載 | |

<!-- TODO: Ver2以降の対応可否・必要なXIAO・制約を記載 -->

#### ケース・基板の準備

<!-- TODO: 分解する箇所、加工や交換が必要な部品、作業前の状態を写真付きで記載 -->

#### 取り付け・配線

<!-- TODO: 取り付け位置、固定方法、配線図、接続先のパッド・ピン名を写真付きで記載 -->

#### 組み付け前の確認

<!-- TODO: 配線・固定・ケースとの干渉について確認する項目を記載 -->

#### Firmware

##### 対応Firmwareの入手

<!-- TODO: 配布先、対応バージョン、左右それぞれのUF2ファイル名を記載 -->
<!-- TODO: 自分でビルドする場合のリポジトリ、ブランチ、設定変更、ビルド対象を記載 -->

##### Firmwareの書き込み

UF2を書き込む基本操作は、[Firmwareの書き込み方法]({{ '/guides/firmware/' | relative_url }})を参照してください。このカスタム用のFirmwareと左右への書き込み手順は、ここへ追記します。

<!-- TODO: 左右への書き込み順序、settings_resetの要否、書き込み後の再接続手順を記載 -->

</div>

</div>

<script src="{{ '/assets/js/version-tabs.js' | relative_url }}" defer></script>

## 動作確認・設定

[ジェスチャの割り当て](https://github.com/nixiy/zmk-config-nickey44a/blob/tps43/docs/dual-tps43.md#%E3%82%B8%E3%82%A7%E3%82%B9%E3%83%81%E3%83%A3%E3%81%AE%E5%89%B2%E3%82%8A%E5%BD%93%E3%81%A6) を参考に基本的な操作が行なえます。

<!-- TODO: キー入力とタッチ操作、クリック、スクロールの確認手順を記載 -->
<!-- TODO: 感度、操作方向、クリック・スクロールの割り当てなど、対応する設定方法を記載 -->

## トラブルシューティング

<!-- TODO: デバイスが反応しない、操作方向が違うなどの症状と対処を記載 -->

## 関連リンク

- [Nickey44A カスタム]({{ '/nickey44a/custom/' | relative_url }})
- [Nickey44A ビルドガイド]({{ '/nickey44a/' | relative_url }})
- [共通トラブルシューティング]({{ '/guides/troubleshooting/' | relative_url }})
