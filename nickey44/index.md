---
layout: default
title: Nickey44 ビルドガイド
---

# Nickey44 ビルドガイド

このページでは、完全ワイヤレス分割キーボード「Nickey44」の組み立てから、ファームウェアの書き込み、Bluetoothペアリング、動作確認までを説明します。

> このガイドは [PotaMegaの元記事](https://nixdesire.com/nickey-buildguide-2/) をGitHub Pages向けに再構成したものです。

<nav class="toc-panel" data-toc aria-label="ページ内目次">
  <p class="toc-title">目次</p>
  <ol class="toc-list" data-toc-list></ol>
</nav>

<aside class="toc-panel side-toc" data-toc aria-label="サイド目次">
  <p class="toc-title">目次</p>
  <ol class="toc-list" data-toc-list></ol>
</aside>

<script src="{{ '/assets/js/toc.js' | relative_url }}" defer></script>

## Nickey44について

Nickey44の主な特徴は次のとおりです。

- Bluetooth対応
- 44キーのオーソリニア配列
- Choc v2対応のロープロファイル設計
- 17 mmの狭ピッチ
- ZMK Firmware
- 薄型の左右分割デザイン

組み立ては、おおむね次の順番で進めます。

1. 部品を確認する
2. マイコン、ソケット、電源スイッチをはんだ付けする
3. バッテリーケーブルを接続する
4. ケースへ組み込む
5. ファームウェアを書き込む
6. Bluetooth接続とキー入力を確認する

## 部品一覧

![Nickey44キットに含まれる基板、ソケット、バッテリー、ケーブル、ケース部品](images/parts/01-parts.jpg)

組み立てる前に、部品の種類と数量を確認してください。

| 部品 | 数量 | キット付属 | 備考 |
| --- | ---: | :---: | --- |
| Nickey PCB（左・右） | 各1 | ✅ | ダイオードとバッテリーソケットは実装済み |
| M2 丸スペーサー 4 mm | 10 | ✅ | |
| M2 ネジ 5 mm | 10 | ✅ | トッププレート側に使用 |
| M2 ネジ 3 mm | 10 | ✅ | ボトムケース側に使用 |
| Choc v2 ホットスワップソケット | 44 | ✅ | |
| JST 1.25 mm コネクタ付きケーブル（オス） | 2 | ✅ | |
| はんだ入り熱収縮チューブ | 4 | ✅ | バッテリー線とJSTケーブルの接続に使用 |
| スライドスイッチ ISH-1260-HA-G | 2 | ✅ | |
| Seeed Studio XIAO nRF52840 | 2 | ❌ | **Plusではなく無印を使用** |
| 動作確認用LiPoバッテリー 3.7 V / 200 mAh / 601040 | 2 | ✅ | |
| 17 mmピッチ対応キーキャップ | 44 | ❌ | |
| Choc v2キースイッチ | 44 | ❌ | |

<div class="callout callout-important" role="note" aria-label="重要">
  <p class="callout-title">ⓘ 重要</p>
  <p>XIAO nRF52840 Plusでは動作しません。必ず無印のXIAO nRF52840を用意してください。</p>
</div>

### 入手先の例

- [Seeed Studio XIAO nRF52840](https://shop.beekeeb.jp/products/seeed-studio-xiao-nrf52840-xiao-ble)
- [バッテリー 3.7 V / 200 mAh / 601040](https://amzn.to/4tGIAtD)
- [Choc v2 ホットスワップソケット](https://shop.beekeeb.jp/products/kailh-choc-hotswap-sockets)
- [M2 4 mm 丸スペーサー](https://shop.yushakobo.jp/products/a0800c2?variant=37665435123873)
- [M2平ネジ](https://shop.yushakobo.jp/products/a0800s2?variant=37665432535201)
- [スライドスイッチ ISH-1260-HA-G](https://akizukidenshi.com/catalog/g/g115370/)

ケースを自分で印刷する場合は、[zmk-config-nickeyの3Dモデル](https://github.com/nixiy/zmk-config-nickey/tree/main/model)を利用できます。元記事での印刷条件は、Bambu Lab P1S、積層ピッチ0.12 mm、サポートあり（小さなオーバーハングを無視しない）です。

![左右のボトムケース、トッププレート、マイコンカバーを仮組みした状態](images/parts/02-case-parts.jpg)

ケース一式は次の部品で構成されます。

- ボトムケース × 2
- トッププレート × 2
- XIAOカバー × 2
- XIAOリセットボタン × 2
- 電源スイッチカバー × 2

## 必要な道具

### 必須

- はんだごて、はんだ、こて台
- 細めのドライバー
- ニッパー
- ワイヤーストリッパー
- マスキングテープ

### あると便利

- 耐熱マット
- ペンタイプのフラックス
- 先の曲がったピンセット
- はんだ吸い取り線
- テスター
- 保護メガネ
- ケース底面用の滑り止め：ケース底面の滑り止めとして[GRIPLUS（グリップラス）](https://amzn.to/4ywBbAg)がおすすめです。

組み立ての様子は次の動画でも確認できます。Vol.1の後半には、バッテリー線へ熱収縮チューブを取り付ける作業があります。

### 組み立てライブ配信 Vol.1

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/srst_7mpgqU"
    title="Nickey44 組み立てライブ配信 Vol.1"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

[YouTubeでVol.1を見る](https://www.youtube.com/watch?v=srst_7mpgqU)

### 組み立てライブ配信 Vol.2

<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/h0ucaMpeFN0"
    title="Nickey44 組み立てライブ配信 Vol.2"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

[YouTubeでVol.2を見る](https://www.youtube.com/watch?v=h0ucaMpeFN0)

## はんだ付け

### XIAO nRF52840の取り付け

XIAOは**PCBの表側**へ取り付けます。マイコンの金色の端子とPCBのパッド、左右7か所ずつ、合計14か所をはんだ付けします。

![XIAO nRF52840のはんだ付け箇所を赤点で示したPCB](images/soldering/03-xiao-solder-points.jpg)

位置決めには7ピンヘッダーを利用できます。ヘッダーは治具として使うだけなので、ヘッダー自体ははんだ付けしません。

![PCB、XIAO nRF52840、位置決め用7ピンヘッダー](images/soldering/04-xiao-alignment-header.jpg)

7ピンヘッダーを差し込んでXIAOの位置を合わせ、反対側の端子を数か所はんだ付けします。位置が固定できたらヘッダーを外し、残りの端子をはんだ付けしてください。

![7ピンヘッダーでPCB上に位置決めしたXIAO nRF52840](images/soldering/05-xiao-positioned.jpg)

端子間をはんだでつなぐ「ブリッジ」を起こさないよう、十分に確認してください。

#### バッテリー用スルーホール

バッテリー用スルーホールへは、十分にフラックスを塗ってからはんだを流します。

![PCB上のバッテリー用スルーホールと注意箇所](images/soldering/06-battery-through-holes.jpg)

<div class="callout callout-caution" role="note" aria-label="注意">
  <p class="callout-title">⚠ 注意</p>
  <p>2つのパッドがブリッジするとバッテリーが短絡し、発熱や発火につながるおそれがあります。テスターがある場合は、パッド間が導通していないことを確認してください。</p>
</div>

キーボードとしての動作に不要なほかのスルーホールは、はんだ付けしなくてもかまいません。

### Choc v2ソケットの取り付け

Choc v2ソケットは**PCBの裏側**へ取り付けます。

1. ソケット1個分の片側パッドに、あらかじめ少量のはんだを盛ります。

   ![Choc v2ソケットの片側パッドへ予備はんだを盛ったPCB](images/soldering/07-socket-first-pad.jpg)

2. ソケットをピンセットで押さえながら予備はんだを溶かし、位置を固定します。

   ![八角形のシルクに軸側を合わせたChoc v2ソケット](images/soldering/08-socket-positioning.jpg)

3. 反対側の端子もはんだ付けします。すべてのソケットで繰り返してください。

ソケットには向きがあります。スイッチ中央の軸が入る側を、PCBの八角形のシルクへ合わせてください。詳しくは[「Kailh Choc ソケットの方向について」](https://scrapbox.io/self-made-kbds-ja/Kailh_Choc_%E3%82%BD%E3%82%B1%E3%83%83%E3%83%88%E3%81%AE%E6%96%B9%E5%90%91%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)も参考になります。

![すべてのChoc v2ソケットを取り付けたPCB裏面](images/soldering/09-sockets-complete.jpg)

### 電源スイッチの取り付け

電源スイッチは**PCBの裏側**から差し込み、スライド部がPCBの外側を向くようにします。

![PCB裏側から差し込んだ電源スイッチ](images/soldering/10-power-switch-back.jpg)

表側へ出た端子をはんだ付けします。

![PCB表側に出た電源スイッチの端子](images/soldering/11-power-switch-front.jpg)

余った端子は折り曲げるか、ニッパーで切断します。

<div class="callout callout-warning" role="alert" aria-label="警告">
  <p class="callout-title">⚠ 警告</p>
  <p>切断した端子は勢いよく飛ぶことがあります。保護メガネを着用し、人や壊れやすい物へ向けないでください。</p>
</div>

## バッテリーとケーブルの接続

<div class="callout callout-warning" role="alert" aria-label="LiPoバッテリーの警告">
  <p class="callout-title">⚠ LiPoバッテリーの取り扱い</p>
  <p>LiPoバッテリーは、短絡や不適切な加熱によって発煙・発火する危険があります。必ず片方の線ずつ作業し、異常な発熱、膨張、におい、発煙があれば直ちに作業と使用を中止してください。</p>
</div>

市販のバッテリー線とJSTコネクタ付きケーブルを、はんだ入り熱収縮チューブで接続します。

組み立てライブ配信のVol.1後半でもこの作業を確認できます。また、[Amazonのバッテリー販売ページ](https://www.amazon.co.jp/dp/B0GHR215SF)にも参考動画があります。

![LiPoバッテリー、JSTケーブル、はんだ入り熱収縮チューブ](images/battery/12-battery-and-jst-cable.jpg)

1. バッテリー側の片方の線だけを選び、被覆を約5 mmむきます。写真では赤線から作業しています。

   ![赤線だけ被覆をむいたLiPoバッテリー](images/battery/13-strip-battery-wire.jpg)

2. バッテリー側とJST側で同じ色の線を合わせ、銅線がチューブ中央のはんだ部分へ来るように差し込みます。

   ![はんだ入り熱収縮チューブの中央に合わせた電線](images/battery/14-solder-sleeve-position.jpg)

3. 次の順序で、ライター、ヒートガン、またははんだごてを使ってゆっくり加熱します。ライターを使う場合は炎を近づけすぎず、バッテリー本体やケーブルに長時間当てないでください。バッテリー本体は直接加熱しないでください。

   1. 両端の白い部分を収縮させ、線を固定する
   2. 中央を十分に熱し、はんだが溶けて広がることを確認する
   3. 完全に冷めてから軽く引っ張り、抜けないことを確認する

4. 接続部が冷えたら、もう片方の線も同じ手順で接続します。

![収縮と中央のはんだ付けが完了したバッテリー線](images/battery/15-solder-sleeve-complete.jpg)

## ケースへの取り付け

### バッテリーの接続と固定

JSTコネクタをPCBのバッテリーソケットへ差し込みます。ケーブルを無理に引っ張らず、極性とコネクタの向きを確認してください。

バッテリーは、ネジ止めの邪魔にならない写真の位置を目安に、マスキングテープで仮固定します。

![PCB裏面へ接続し、マスキングテープで固定したバッテリー](images/assembly/16-battery-mounted.jpg)

### 電源スイッチカバーの取り付け

電源スイッチへ小さなスイッチカバーを取り付けます。

![PCBの電源スイッチとオレンジ色のスイッチカバー](images/assembly/17-power-switch-cover-part.jpg)

![トッププレート越しに取り付けた電源スイッチカバー](images/assembly/18-power-switch-cover-fit.jpg)

カバーが緩すぎる場合は、ペンチで隙間をわずかに狭めて調整します。一度に強くつぶさず、少しずつ試してください。

![ペンチで電源スイッチカバーの隙間を調整している様子](images/assembly/19-power-switch-cover-adjust.jpg)

### マイコンカバーの組み立て

XIAOカバーとオレンジ色のリセットボタンを用意します。

![白いXIAOカバーとオレンジ色のリセットボタン](images/assembly/20-controller-cover-parts.jpg)

カバーを裏返し、右側の穴へリセットボタンを差し込みます。

![XIAOカバー裏側へリセットボタンを差し込む位置](images/assembly/21-insert-reset-button.jpg)

![XIAOカバー裏側に収まったリセットボタン](images/assembly/22-reset-button-seated.jpg)

表側から、オレンジ色のボタン先端が見えることを確認します。

![XIAOカバー表側から見たリセットボタン](images/assembly/23-reset-button-front.jpg)

カバーのUSB Type-C用の溝をXIAOのコネクタへ合わせます。

![XIAOのUSB Type-Cコネクタとカバーの位置合わせ](images/assembly/24-controller-cover-alignment.jpg)

![USB Type-C用の溝へ合わせたXIAOカバー](images/assembly/25-controller-cover-usb-c-slot.jpg)

上からまっすぐ押し込み、左右が確実にはまっていることを確認します。

![装着したXIAOカバーをUSB端子側から見た状態](images/assembly/26-controller-cover-installed-left.jpg)

![装着したXIAOカバーを反対側から見た状態](images/assembly/27-controller-cover-installed-right.jpg)

リセットボタンを押し、クリック感があり、押した後に戻ることを確認してください。戻らない場合は、写真のように小型ドライバーやキリを使い、ボタン穴を少しだけ広げます。

![小型ドライバーでXIAOカバーのリセットボタン穴を調整する様子](images/assembly/28-reset-button-hole.jpg)

### トッププレートとボトムケースの組み立て

電源スイッチを傷めないよう、ボトムケースの穴へそっと通します。

![ボトムケースの穴へ電源スイッチを通している途中](images/assembly/29-insert-power-switch.jpg)

![ボトムケースの穴に収まった電源スイッチ](images/assembly/30-power-switch-seated.jpg)

次の順序で固定します。

1. トッププレートとPCBを重ね、キースイッチを取り付ける
2. トッププレートと4 mmスペーサーをM2 5 mmネジで固定する
3. 電源スイッチへスイッチカバーを取り付ける
4. ボトムケースへ載せ、裏側からM2 3 mmネジで固定する

ネジを締めすぎてケースやPCBを傷めないようにしてください。

![ケースへ組み込んだNickey44片側](images/assembly/31-assembled-keyboard.jpg)

## ZMK Firmware

設定ファイルと詳しいカスタマイズ方法は、[nixiy/zmk-config-nickey](https://github.com/nixiy/zmk-config-nickey)にあります。

- 右側: セントラル。PCやスマートフォンと直接通信します。
- 左側: ペリフェラル。右側を経由して通信します。

完成品には[標準ファームウェア v1.0.0](https://github.com/nixiy/zmk-config-nickey/tree/main/firmware/v1.0.0)が書き込まれています。

### DYA Studioを利用する場合

[DYA Studio](https://studio.dya.cormoran.works/)では、ブラウザからNickey44へ接続し、レイヤーごとのキーマップ確認、キー割り当ての編集、キーボードへの保存ができます。

DYA Studioを使う場合は、左右両方を[DYA Studio対応ファームウェア v1.1.0](https://github.com/nixiy/zmk-config-nickey/tree/main/firmware/v1.1.0)へ更新してください。

![DYA StudioでNickey44のレイヤーを編集している画面](images/firmware/32-dya-studio-keymap.jpg)

[Keyboard Abyss](https://abyss.keyboard-hub.com/)と連携すると、DYA Studioから読み取ったキーマップをオンラインで保存、公開できます。

![Keyboard Abyssで公開したNickey44のキーマップページ](images/firmware/33-keyboard-abyss-keymap.jpg)

### ファームウェアの書き込み

左右を1台ずつUSB接続して作業します。

1. XIAO nRF52840をUSBでPCへ接続します。
2. リセットボタンを素早く2回押します。
3. ブートローダードライブがエクスプローラーに表示されることを確認します。

   ![XIAOカバー上のリセットボタン位置](images/firmware/34-xiao-bootloader-drive.jpg)

4. 対応するUF2ファイルをドライブへドラッグ＆ドロップします。

   - 右側には `nickey_r` で始まるファイル
   - 左側には `nickey_l` で始まるファイル

   ![右用と左用のUF2ファームウェアファイル](images/firmware/35-firmware-files.jpg)

コピー後はドライブが自動的に閉じ、キーボードが再起動します。

### 左右間の接続テスト

左右へ正しいファームウェアを書き込むと、自動的に接続されます。左側でレイヤー1キーを押している間、右側XIAOのLEDが赤く点灯すれば左右間の通信は成功です。

![レイヤー1キーと右側XIAOの赤色LEDを示した接続テスト図](images/firmware/36-split-connection-test.jpg)

## デフォルトキーマップ

![Nickey44の4レイヤー分のデフォルトキーマップ](images/firmware/37-default-keymap.jpg)

- レイヤー0: 通常の文字入力。`Q`、`A`、`Z`の左にTab、Ctrl、Shiftを配置
- レイヤー1: 矢印、Fn、括弧など。矢印は`H`、`J`、`K`、`L`へ配置
- レイヤー2: 記号。文字から連想しやすい位置へ記号を配置
- レイヤー3: Bluetoothの接続先選択とペアリング情報の消去

### キー入力テスト

組み立て後は[キーボードテスト](https://www.onlinemictest.com/ja/keyboard-test)などを使い、すべてのキーが入力できることを確認します。

![オンラインキーボードテストでキー入力を確認している画面](images/firmware/38-key-input-test.jpg)

### キーマップを変更する

GitHubでファームウェアをカスタマイズするには、GitHubアカウントが必要です。持っていない場合は、事前に[GitHubアカウントを作成](https://github.com/signup)してください。

作業の流れは次のとおりです。

1. GitHubアカウントを用意する
2. [nixiy/zmk-config-nickey](https://github.com/nixiy/zmk-config-nickey)を自分のアカウントへForkする
3. ZMK Keymap Editorで編集する
4. GitHub Actionsでビルドする
5. Artifactsからファームウェアをダウンロードする
6. XIAOへ左右に対応するUF2ファイルを書き込む

まず、[nixiy/zmk-config-nickey](https://github.com/nixiy/zmk-config-nickey)を自分のアカウントへForkします。

![GitHubリポジトリ画面のForkボタン](images/firmware/39-github-fork-button.jpg)

[ZMK Keymap Editor](https://nickcoutsos.github.io/keymap-editor/)を使うと、ブラウザ上でキー割り当てを変更できます。事前設定については、ファームウェアリポジトリのREADMEも確認してください。

![ZMK Keymap EditorでNickey44の配列を編集している画面](images/firmware/40-keymap-editor.jpg)

変更を保存した後は、GitHubリポジトリの「Actions」を開きます。

![GitHubリポジトリのActionsタブ](images/firmware/41-github-actions-tab.jpg)

成功を示す緑のチェックが付いた最新のワークフローを選びます。

![成功したGitHub Actionsワークフロー一覧](images/firmware/42-github-actions-run.jpg)

ワークフロー詳細の「Artifacts」からファームウェアをダウンロードして展開し、左右に対応するUF2ファイルを書き込みます。

![GitHub Actionsのfirmwareアーティファクト](images/firmware/43-firmware-artifact.jpg)

## Bluetoothペアリング

PCやスマートフォンでBluetoothデバイスの追加画面を開き、`nickey`を選択します。

![WindowsのBluetoothデバイス追加画面に表示されたnickey](images/bluetooth/44-bluetooth-pairing.jpg)

### Bluetoothレイヤー

レイヤー3にはBluetooth操作を割り当てています。

![BT0からBT4、BT CLR、BT CLR ALLを配置したBluetoothレイヤー](images/bluetooth/45-bluetooth-layer.jpg)

- `BT0`～`BT4`: 最大5台の接続先を選択。未登録のスロットを選ぶとペアリングモードになります。
- `BT CLR`: 現在選択中のスロットのペアリング情報を消去します。
- `BT CLR ALL`: すべてのスロットのペアリング情報を消去します。

### デバイス一覧に表示されない場合

`BT CLR ALL`を実行して、ペアリング情報を初期化します。

![Nickey44のBluetoothレイヤーでBT CLR ALLに使う3キー](images/bluetooth/45-bluetooth-layer.jpg)

1. レイヤー0でSpace左隣のレイヤー1キーを押したままにする
2. レイヤー1でレイヤー3キーを押したままにする
3. レイヤー3で`BT CLR ALL`を押す

![BT CLR ALLを実行するキーの押下順序](images/bluetooth/46-bluetooth-clear-all-order.jpg)

XIAOのLEDが点滅したら、もう一度デバイス側からペアリングしてください。それでも表示されない場合は、`BT1`など別の接続スロットを選んで試します。

## トラブルシューティング

### 充電状態を確認する

USB接続中にXIAOの充電LEDが緑色に点灯すれば、充電されています。カバー装着時はLEDが見えにくいことがあります。

![XIAO nRF52840の緑色に点灯する充電LED](images/troubleshooting/47-charging-led.jpg)

<div class="callout callout-note" role="note" aria-label="補足">
  <p class="callout-title">ⓘ 補足</p>
  <p>電源スイッチがONのときだけ充電されます。OFFの状態では充電されません。</p>
</div>

### 有線接続する

右側のXIAOをUSBでPCへ接続すると、有線キーボードとして使用できます。左右間は無線で繋がります。

### 左右が接続できなくなった

ファームウェアの変更後などに左右間の接続が復旧しない場合は、設定リセット用ファームウェアを挟んで書き直します。

![設定リセット用と左右用のUF2ファームウェア](images/troubleshooting/48-settings-reset-firmware.jpg)

次の順番で書き込んでください。

1. 右側へ `settings_reset` で始まるUF2を書き込む
2. 右側へ `nickey_r` で始まるUF2を書き込む
3. 左側へ `settings_reset` で始まるUF2を書き込む
4. 左側へ `nickey_l` で始まるUF2を書き込む

## 完成

左右の接続、Bluetoothペアリング、全キーの入力を確認できれば完成です。

![組み立てが完了した左右のNickey44](images/completed/49-completed-nickey44.jpg)

不具合や不明点は、[Nickey Discordサーバー](https://discord.com/invite/SE8h8wK3)で相談できます。
