---
layout: default
title: Firmwareの書き込み方法
description: XIAO nRF52840搭載キーボードへUF2形式のFirmwareを書き込む基本手順
image: /nickey44/images/firmware/34-xiao-bootloader-drive.jpg
permalink: /guides/firmware/
---

# Firmwareの書き込み方法

XIAO nRF52840を搭載したキーボードへ、UF2形式のFirmwareを書き込む基本手順です。使用するFirmware、左右の役割、ファイル名は製品ごとのビルドガイドで確認してください。

## 用意するもの

- PC
- データ通信対応のUSB Type-Cケーブル
- 製品に対応したUF2ファイル

充電専用ケーブルでは、PCがXIAOを認識しません。

## ブートローダーモードにする

1. XIAO nRF52840をUSBでPCへ接続します。
2. リセットボタンを素早く2回押します。
3. ブートローダードライブがエクスプローラーに表示されることを確認します。

![XIAOカバー上のリセットボタン位置の例]({{ '/nickey44/images/firmware/34-xiao-bootloader-drive.jpg' | relative_url }})

リセットボタンの位置やカバー形状は製品によって異なります。

## UF2ファイルを書き込む

対応するUF2ファイルをブートローダードライブへドラッグ＆ドロップします。コピー後はドライブが自動的に閉じ、キーボードが再起動します。

左右分割キーボードでは、左右それぞれに対応するFirmwareを書き込んでください。Firmwareのバージョンや書き込む順序は、各製品のビルドガイドに従ってください。

## うまく書き込めない場合

PCにドライブが表示されない場合は、データ通信対応のUSBケーブルを使っているか確認し、リセットボタンをもう一度素早く2回押してください。解決しない場合は、[共通トラブルシューティング]({{ '/guides/troubleshooting/' | relative_url }})を確認してください。
