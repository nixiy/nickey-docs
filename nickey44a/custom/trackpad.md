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

基板のバージョンを選んで、改造方法とFirmwareの手順を確認してください。各バージョンの対応条件・手順は準備中です。

<div class="version-tabs" data-version-tabs>
  <div class="version-tabs__list" aria-label="基板バージョン" hidden>
    <button type="button" id="trackpad-tab-ver1.1" data-version-tab aria-controls="trackpad-ver1.1">Ver1.1</button>
    <button type="button" id="trackpad-tab-ver2" data-version-tab aria-controls="trackpad-ver2">Ver2</button>
  </div>

<div class="version-tabs__panel" id="trackpad-ver1.1" data-version-panel markdown="1">

### Ver1.1

<!-- TODO: Ver1の対応可否・必要なXIAO・制約を記載 -->

#### 必要な部品・道具

| 部品 | 型番 | 数量 | 入手先 | 備考 |
| --- | --- | ---: | --- | --- |
| トラックパッド本体 | TPS43-201A-S | 2 | [マルツ](https://www.marutsu.co.jp/pc/i/25650684/) | |
| トラックパッド用プレート | -| 2 | [BOOTH](https://booth.pm/ja/items/4785113) |調達できなければ3DP製のプレートを貼る |
| 配線・コネクター | ピッチ変換FPC（6ピン） | 2 | [BOOTH](https://booth.pm/ja/items/8265223) | |
| 電線ケーブル | 太さ30AWG | 1 | [Amazon](https://www.amazon.co.jp/dp/B0CRHVB4JK) |7色入ってるので色分けしやすい |
| 対応ケース・プレート | 未記載 | 未記載 | boothからDLできるファイル名を記載 | |


#### 改造方法

##### ケース・基板の準備

<!-- TODO: 分解する箇所、加工や交換が必要な部品、作業前の状態を写真付きで記載 -->

##### 取り付け・配線

![Nickey44A Ver1.1のトラックパッド用FPCと基板の配線例]({{ '/nickey44a/custom/images/trackpad-ver1-1-wiring.jpg' | relative_url }})

RST（フレキ側のNRST）とRDYは、基板側のパッドを経由せず、XIAO表面右下の隠しGPIOパッドから直接配線します。

| 信号 | PCB側の接続先 | XIAO側の接続先 | 備考 | 配線色
| --- | --- | --- | --- |
| RST（NRST） | - | P0.16 | XIAOから直接配線 | 白色
| RDY | - | P1.10 | XIAOから直接配線 | 黄色


| ピン番号 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| 基板側 | GND | SDA（P0.09） | SCL（P0.10） | - | - | 3.3V |
| フレキ側 | SDA | SCL | VDDHI | GND | NRST | RDY |

<!-- TODO: 取り付け位置、固定方法、配線図、接続先のパッド・ピン名を写真付きで記載 -->

##### 組み付け前の確認

<!-- TODO: 配線・固定・ケースとの干渉について確認する項目を記載 -->

#### Firmware

##### 対応Firmwareの入手

<!-- TODO: 配布先、対応バージョン、左右それぞれのUF2ファイル名を記載 -->
<!-- TODO: 自分でビルドする場合のリポジトリ、ブランチ、設定変更、ビルド対象を記載 -->

##### Firmwareの書き込み

UF2を書き込む基本操作は、[Firmwareの書き込み方法]({{ '/guides/firmware/' | relative_url }})を参照してください。このカスタム用のFirmwareと左右への書き込み手順は、ここへ追記します。

<!-- TODO: 左右への書き込み順序、settings_resetの要否、書き込み後の再接続手順を記載 -->

</div>

<div class="version-tabs__panel" id="trackpad-ver2" data-version-panel markdown="1">

### Ver2

#### 必要な部品・道具

| 部品 | 型番 | 数量 | 入手先 | 備考 |
| --- | --- | ---: | --- | --- |
| トラックパッド本体 | TPS43-201A-S | 2 | [マルツ](https://www.marutsu.co.jp/pc/i/25650684/) | |
| トラックパッド用プレート | -| 2 | [BOOTH](https://booth.pm/ja/items/4785113) |調達できなければ3DP製のプレートを貼る |
| 配線・コネクター | ピッチ変換FPC（6ピン） | 2 | [BOOTH](https://booth.pm/ja/items/8265223) | |
| 電線ケーブル | 太さ30AWG | 1 | [Amazon](https://www.amazon.co.jp/dp/B0CRHVB4JK) |7色入ってるので色分けしやすい |
| 対応ケース・プレート | 未記載 | 未記載 | boothからDLできるファイル名を記載 | |

<!-- TODO: Ver2以降の対応可否・必要なXIAO・制約を記載 -->

#### 改造方法

##### ケース・基板の準備

<!-- TODO: 分解する箇所、加工や交換が必要な部品、作業前の状態を写真付きで記載 -->

##### 取り付け・配線

<!-- TODO: 取り付け位置、固定方法、配線図、接続先のパッド・ピン名を写真付きで記載 -->

##### 組み付け前の確認

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

<!-- TODO: キー入力とタッチ操作、クリック、スクロールの確認手順を記載 -->
<!-- TODO: 感度、操作方向、クリック・スクロールの割り当てなど、対応する設定方法を記載 -->

## トラブルシューティング

<!-- TODO: デバイスが反応しない、操作方向が違うなどの症状と対処を記載 -->

## 関連リンク

- [Nickey44A カスタム]({{ '/nickey44a/custom/' | relative_url }})
- [Nickey44A ビルドガイド]({{ '/nickey44a/' | relative_url }})
- [共通トラブルシューティング]({{ '/guides/troubleshooting/' | relative_url }})
