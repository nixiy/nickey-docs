---
layout: default
title: Nickey44A トラックポイント
description: Nickey44Aにトラックポイントを追加するための部品・改造方法・Firmware書き込みのガイド
permalink: /nickey44a/custom/trackpoint/
---

# Nickey44A トラックポイント

Nickey44Aへトラックポイントを追加するためのガイドです。取り付け・配線とFirmwareの入手・書き込み方法をまとめます。

## 基板バージョン別の手順

基板裏面下部に記載のバージョンを参照し、改造方法とFirmwareの手順を確認してください。

<div class="version-tabs" data-version-tabs>
  <div class="version-tabs__list" aria-label="基板バージョン" hidden>
    <button type="button" id="trackpoint-tab-ver1.1" data-version-tab aria-controls="trackpoint-ver1.1">Ver1.1</button>
    <button type="button" id="trackpoint-tab-ver2" data-version-tab aria-controls="trackpoint-ver2">Ver2</button>
  </div>

<div class="version-tabs__panel" id="trackpoint-ver1.1" data-version-panel markdown="1">

<!-- Ver1.1 -->

<!-- TODO: デバイス本体、配線・コネクター、固定部品、専用ケースなどの型番・数量・入手先を記載 -->
<!-- TODO: 標準の組み立てに加えて必要になる道具を記載 -->

<!-- TODO: 分解する箇所、加工や交換が必要な部品、作業前の状態を写真付きで記載 -->

### 取り付け・配線

![基板上のXIAOとトラックポイントのフレキシブル基板を配線した状態]({{ '/nickey44a/custom/images/trackpoint-installation-wiring.jpg' | relative_url }})

Xiaoの隠しGPIOの右下のPIN(P1.10)を、変換フレキシブルケーブルの右から2番目の箇所にはんだ付けします。
その他は基板側6pinに合わせてはんだ付けして下さい。

### 対応Firmwareの入手

以下のどちらかの方法でFirmwareを入手してください。

- [lppsブランチ](https://github.com/nixiy/zmk-config-nickey44a/tree/lpps)のリポジトリをForkし、GitHub ActionsでビルドしたFirmwareをダウンロードする。
- [GitHub Actionsの実行結果](https://github.com/nixiy/zmk-config-nickey44a/actions/runs/36304303075)から、ビルド済みFirmwareをダウンロードする。

<!-- TODO: 左右への書き込み順序、settings_resetの要否、書き込み後の再接続手順を記載 -->

</div>

<div class="version-tabs__panel" id="trackpoint-ver2" data-version-panel markdown="1">

<!-- Ver2 -->

取り付け・配線の手順は準備中です。

### 対応Firmwareの入手

以下のどちらかの方法でFirmwareを入手してください。

- [lppsブランチ](https://github.com/nixiy/zmk-config-nickey44a/tree/lpps)のリポジトリをForkし、GitHub ActionsでビルドしたFirmwareをダウンロードする。
- [GitHub Actionsの実行結果](https://github.com/nixiy/zmk-config-nickey44a/actions/runs/36304303075)から、ビルド済みFirmwareをダウンロードする。

<!-- TODO: 左右への書き込み順序、settings_resetの要否、書き込み後の再接続手順を記載 -->

</div>

</div>

<script src="{{ '/assets/js/version-tabs.js' | relative_url }}" defer></script>

## Firmwareの書き込み

使用している基板バージョンに対応するFirmwareを、上のタブで入手してください。UF2を書き込む基本操作は、[Firmwareの書き込み方法]({{ '/guides/firmware/' | relative_url }})を参照してください。

<!-- TODO: キー入力とポインター移動、クリック、スクロールの確認手順を記載 -->
<!-- TODO: 感度、操作方向、クリック・スクロールの割り当てなど、対応する設定方法を記載 -->

<!-- TODO: デバイスが反応しない、操作方向が違うなどの症状と対処を記載 -->

## 関連リンク

- [Nickey44A カスタム]({{ '/nickey44a/custom/' | relative_url }})
- [Nickey44A ビルドガイド]({{ '/nickey44a/' | relative_url }})
- [共通トラブルシューティング]({{ '/guides/troubleshooting/' | relative_url }})
