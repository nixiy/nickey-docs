---
layout: default
title: Bluetoothの操作・ペアリング
description: ZMK Firmwareを使うキーボードのBluetooth操作とペアリングの基本
image: /nickey44/images/bluetooth/44-bluetooth-pairing.jpg
permalink: /guides/bluetooth/
---

# Bluetoothの操作・ペアリング

ZMK Firmwareを使うキーボードのBluetooth操作とペアリングの基本です。各操作がどのレイヤー・キーに割り当てられているかは、製品のデフォルトキーマップを確認してください。

## 初回ペアリング

1. キーボードで未登録のBluetoothスロットを選択します。
2. PCまたはスマートフォンでBluetoothデバイスの追加画面を開きます。
3. 表示されたキーボード名を選択してペアリングします。

![WindowsのBluetoothデバイス追加画面の例]({{ '/nickey44/images/bluetooth/44-bluetooth-pairing.jpg' | relative_url }})

表示されるキーボード名は製品によって異なります。

## Bluetooth操作

- `BT0`～`BT4`: 最大5台の接続先を選択します。未登録のスロットを選ぶとペアリングモードになります。
- `BT CLR`: 現在選択中のスロットのペアリング情報を消去します。
- `BT CLR ALL`: すべてのスロットのペアリング情報を消去します。

## デバイス一覧に表示されない場合

ペアリング情報を消去してから、未登録のスロットを選択して再試行します。PCやスマートフォン側に古い登録情報が残っている場合は、そちらも削除してください。

製品固有のキー操作や復旧手順は、その製品のビルドガイドを確認してください。
