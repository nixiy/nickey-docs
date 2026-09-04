---
layout: default
title: Nickey44A ビルドガイド
description: 単4電池で動作する完全ワイヤレス分割キーボード、Nickey44Aの組み立て・Firmware書き込み・Bluetoothペアリングのガイド
image: /assets/images/nickey44a-hero.jpg
---

# Nickey44A ビルドガイド

このページでは、単4電池で動作する完全ワイヤレス分割キーボード「Nickey44A」の組み立てから、Firmwareの書き込み、Bluetoothペアリング、動作確認までを説明します。

![Nickey44A分割キーボード]({{ '/assets/images/nickey44a-hero.jpg' | relative_url }})

> Nickey44AはNickey44と多くの工程が共通ですが、電源・電池端子・ケースの組み立て方法は異なります。このページの手順に従ってください。

<nav class="toc-panel" data-toc aria-label="ページ内目次">
  <p class="toc-title">目次</p>
  <ol class="toc-list" data-toc-list></ol>
</nav>

<aside class="toc-panel side-toc" data-toc aria-label="サイド目次">
  <p class="toc-title">目次</p>
  <ol class="toc-list" data-toc-list></ol>
</aside>

<script src="{{ '/assets/js/toc.js' | relative_url }}" defer></script>

## ⌨️ Nickey44Aについて

Nickey44Aの主な特徴は次のとおりです。

- Bluetooth対応
- 44キーのオーソリニア配列
- Choc v2対応のロープロファイル設計
- 17 mmの狭ピッチ
- ZMK Firmware
- 単4電池で動作する薄型の左右分割デザイン

組み立ては、おおむね次の順番で進めます。

1. 部品を確認する
2. XIAO、ソケット、単4電池端子をはんだ付けする
3. ケースを閉じる前にFirmwareを書き込み、動作を確認する
4. マグネットを取り付け、PCBをケースへ組み込む
5. 単4電池と電池カバーを装着する
6. Bluetooth接続とキー入力を確認する

## 🧩 部品一覧

![部品一覧](../nickey44a/images/parts-layout.jpg)


組み立てる前に、部品の種類と数量を確認してください。

| 部品 | 数量 | キット付属 | 備考 |
| --- | ---: | :---: | --- |
| Nickey44A PCB（左・右） | 各1 | ✅ | |
| M2 ネジ 5 mm | 10 | ✅ | ケース固定に使用 |
| Choc v2 ホットスワップソケット | 44 | ✅ | |
| 単4電池用マイナス端子 | 2 | ✅ | |
| 単4電池用プラス端子 | 2 | ✅ | |
| 6*3mm マグネット | 10 | ✅ | |
| Seeed Studio XIAO nRF52840 | 2 | ❌ | **Plusではなく無印を使用** |
| 17 mmピッチ対応キーキャップ | 44 | ❌ | |
| Choc v2キースイッチ | 44 | ❌ | |
| ボトムケース | 各1 | ✅ | |
| トッププレート | 各1 | ✅ | |
| 電池カバー | 各1 | ✅ | |
| 電源スイッチカバー | 各1 | ✅ | |

<div class="callout callout-important" role="note" aria-label="重要">
  <p class="callout-title">ⓘ 重要</p>
  <p>Seeed Studio XIAO nRF52840 Plusでは動作しません。必ず無印のSeeed Studio XIAO nRF52840を用意してください。</p>
</div>

### 別途必要な部品（必須）

- [Seeed Studio XIAO nRF52840](https://shop.beekeeb.jp/products/seeed-studio-xiao-nrf52840-xiao-ble) × 2（**Plusではなく無印**）
- [Choc v2キースイッチ](https://shop.beekeeb.jp/collections/choc-v2-%E3%82%AD%E3%83%BC%E3%82%B9%E3%82%A4%E3%83%83%E3%83%81) × 44
- [Choc v2／MXステム対応・狭ピッチキーキャップ](https://shop.beekeeb.jp/collections/%E3%82%AD%E3%83%BC%E3%82%AD%E3%83%A3%E3%83%83%E3%83%97-mx-%E3%83%AD%E3%83%BC%E3%83%97%E3%83%AD%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB-%E7%8B%AD%E3%81%84%E3%83%94%E3%83%83%E3%83%81) × 44
- 単4電池 × 2

### キット付属品の入手先（紛失・破損・個別調達用）

- [単4電池用マイナス端子（MonotaRO）](https://www.monotaro.com/p/8835/2521/)
- [単4電池用プラス端子（MonotaRO）](https://www.monotaro.com/p/8835/2512/)
- [Choc v2 ホットスワップソケット](https://shop.beekeeb.jp/products/kailh-choc-hotswap-sockets)
- [M2平ネジ](https://shop.yushakobo.jp/products/a0800s2?variant=37665432535201)

## 🧰 必要な道具

### ✅ 必須

- **はんだごて**：XIAO、ソケット、単4電池端子をはんだ付けするために使います。[参考商品](https://amzn.to/4wbCkvz)
- **はんだ**：部品をPCBへ固定するために使います。[参考商品](https://amzn.to/4f8enzh)
- **細めのドライバー**：ケースのネジを締めるために使います。[参考商品](https://amzn.to/4vytIxO)
- **ニッパー**：端子などを整えるために使います。
- **PC**：Firmwareの書き込みに使います。
- **USB Type-Cケーブル（データ通信対応）**：XIAOをPCへ接続してFirmwareを書き込みます。充電専用ケーブルでは認識されません。
- **テスター**：はんだ付け後に短絡がないこと、電池の電圧や昇圧回路の動作を確認するために使います。ペンタイプが使いやすくおすすめです。[参考商品](https://amzn.to/4fgAJ05)
- **フラックス**：はんだ付けする箇所へ先に塗ると、はんだの乗りが良くなります。ペンタイプがおすすめです。[参考商品](https://amzn.to/3T7ey5c)
- **ペンチ**：単4電池端子を変形させるのに使います。

### 👍 強く推奨

- **ピンセット**：スイッチソケットなど細かい部品をつまむために使います。先が曲がったタイプがおすすめです。[参考商品](https://amzn.to/4prI4Pe)

### ✨ あると便利

- **はんだごてスタンド**：はんだごてを安全に置くために使います。[参考商品](https://amzn.to/4posS5k)
- **耐熱マット**：机を傷つけず、部品が滑らないようにするために便利です。[参考商品](https://amzn.to/4b0jQpd)
- **はんだ吸い取り線**：付けすぎたはんだを除去するために使います。あると安心です。[参考商品](https://amzn.to/4ysWx1c)
- **保護メガネ**：ニッパーを使う際に、飛散する部品から目を守ります。
- **ケース底面用の滑り止め**：ケース底面の滑り止めとして[GRIPLUS（グリップラス）](https://amzn.to/4ywBbAg)がおすすめです。

## 🔥 はんだ付け

### Choc v2ソケットの取り付け

Choc v2ソケットは**PCBの裏側**へ取り付けます。

ソケットには向きがあります。スイッチ中央の軸が入る側を、PCBの八角形のシルクに合わせてください。向きを誤るとキースイッチを取り付けられません。

<div class="callout callout-important" role="note" aria-label="重要">
  <p class="callout-title">ⓘ 重要</p>
  <p>一部のソケットは周囲のスペースの都合で向きが回転しています。はんだ付けしやすくするため、必ず次の写真の順で取り付けてください。</p>
</div>

1. 先に、通常の向きのソケットを取り付けます。

   ![通常の向きのChoc v2ソケット](../nickey44a/images/chocv2/03-socket-orientation.jpg)

2. 次に、回転した向きのソケットを取り付けます。

   ![回転した向きのChoc v2ソケットを位置合わせする](../nickey44a/images/chocv2/02-socket-positioning.jpg)

3. すべてのソケットがPCBのシルクに沿って配置されていることを確認します。

   ![すべてのChoc v2ソケットを取り付けたPCB裏面](../nickey44a/images/chocv2/01-socket-orientation-on-pcb.jpg)

各ソケットは、次の手順ではんだ付けします。

1. PCBの片側のパッドへ、少量の予備はんだをします。

   ![片側のパッドに予備はんだを盛る](images/chocv2/04-pre-tinned-pad.jpg)

2. Choc v2ソケットを、PCBのシルクと向きを確認した正しい位置に置きます。

   ![PCB上の正しい位置にChoc v2ソケットを置く](images/chocv2/05-socket-positioned.jpg)

3. ピンセットなどでソケットをPCBへ押さえながら、予備はんだを再加熱します。

   ![予備はんだを再加熱し、ソケットをPCBへ押さえる](images/chocv2/06-reheat-while-pressing.jpg)

4. ソケットがPCBへ密着した状態で固定されていることを確認します。

5. 反対側の端子をはんだ付けします。

   ![両側の端子をはんだ付けしたChoc v2ソケット](images/chocv2/07-socket-soldered.jpg)

6. ソケットが浮いていないこと、端子間にはんだブリッジがないことを確認します。完成。

   ![すべてのChoc v2ソケットをはんだ付けしたPCB裏面](images/chocv2/08-sockets-soldered-overview.jpg)

ソケットの向きについては、[「Kailh Choc ソケットの方向について」](https://scrapbox.io/self-made-kbds-ja/Kailh_Choc_%E3%82%BD%E3%82%B1%E3%83%83%E3%83%88%E3%81%AE%E6%96%B9%E5%90%91%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)も参考にしてください。

### 単4電池端子の取り付け

単4電池用の端子をPCBへはんだ付けします。マイナス側には[単4電池用マイナス端子（MonotaRO）](https://www.monotaro.com/p/8835/2521/)、プラス側には[単4電池用プラス端子（MonotaRO）](https://www.monotaro.com/p/8835/2512/)を使用します。

<div class="callout callout-important" role="note" aria-label="重要">
  <p class="callout-title">ⓘ 重要</p>
  <p>端子は電池を保持する機械部品でもあります。<strong>端子がPCBにまっすぐ密着していること</strong>を確認してから、はんだ付けしてください。端子が浮いた状態で固定すると、電池の着脱時に端子やPCBへ過度な力が掛かります。</p>
</div>

1. プラス端子とマイナス端子を確認します。端子は出荷時に折り曲げ済みです。**曲げ直したり、向きを変えたりしないでください。**

   ![プラス端子とマイナス端子の形状](images/aaa-terminal/01-terminal-types.jpg)
   ![折り曲げ済みの単4電池端子](images/aaa-terminal/02-terminal-orientation.jpg)

2. PCBの極性表示（`+`／`-`）と端子の形状を照らし合わせます。**プラス端子とマイナス端子を取り違えないでください。**
3. PCBの裏側から所定の穴へ端子を差し込み、表側へピンを出します。端子がPCBに密着していることを確認します。

   ![PCBに差し込んだプラス端子](images/aaa-terminal/03-plus-terminal-inserted.jpg)
   ![PCBに差し込んだマイナス端子](images/aaa-terminal/04-minus-terminal-inserted.jpg)

4. PCB表側へ出たピンをペンチで軽く折り曲げ、端子を仮固定します。このときも端子が浮いたり傾いたりしていないことを確認します。

   ![プラス端子のピンを折り曲げて仮固定した状態](images/aaa-terminal/05-plus-terminal-pins-bent.jpg)
   ![マイナス端子のピンを折り曲げて仮固定した状態](images/aaa-terminal/06-minus-terminal-pins-bent.jpg)

5. テスターがある場合は、**はんだ付け前に**電圧を確認します。トッププレートとPCBを重ね、単4電池を仮に装着してください。端子をケースに収めることで、端子と電池の表裏も確認できます。

   ![トッププレートとPCBを重ねて単4電池を仮装着した状態](images/aaa-terminal/07-voltage-test-setup.jpg)

   以下を確認します。

   - 電池端子の`-`と`+`の間：約`1.2～1.5 V`（電池の種類や残量により異なります）
   - 電源スイッチを`下`へスライド：XIAOの`GND`と`3.3V`の間が`0 V`
   - 電源スイッチを`上`へスライド：XIAOの`GND`と`3.3V`の間が約`3.3 V`

   <div class="callout callout-important" role="note" aria-label="はんだ付け前の確認">
     <p class="callout-title">ⓘ はんだ付け前の確認</p>
     <p>電源スイッチを上へスライドしても約3.3 Vにならない場合は、<strong>はんだ付けを始めないでください。</strong> 電池端子と電池の向きを確認してから、手順3へ戻ります。</p>
   </div>

6. 確認できたら、電池端子のはんだ付け箇所へフラックスを塗ります。

   ![電池端子のはんだ付け箇所へフラックスを塗った状態](images/aaa-terminal/08-flux-applied.jpg)

7. 電池端子をはんだ付けします。端子は金属製で熱が逃げやすいため、こて先を端子とパッドの両方へ当てて十分に(10-15秒)温めてから、はんだを流し込み保持(5秒くらい)します。はんだがなじんだらこてを離し、**はんだが固まるまで端子を動かさないでください。**


   ![プラス端子をはんだ付けしたPCB表側](images/aaa-terminal/09-plus-terminal-soldered-top.jpg)
   ![マイナス端子をはんだ付けしたPCB表側](images/aaa-terminal/10-minus-terminal-soldered-top.jpg)
   ![プラス端子をはんだ付けしたPCB裏側](images/aaa-terminal/11-plus-terminal-soldered-bottom.jpg)
   ![マイナス端子をはんだ付けしたPCB裏側](images/aaa-terminal/12-minus-terminal-soldered-bottom.jpg)

8. 端子がPCBに密着していること、はんだ付け箇所にブリッジや未接合がないことを最終確認します。

<!-- TODO: 単4電池端子取り付け完了後のPCB全体写真を追加 -->

### Seeed Studio XIAO nRF52840の取り付け

XIAOは**PCBの表側**へ取り付けます。マイコンの金色の端子とPCBのパッドを、左右7か所ずつ合計14か所ではんだ付けします。

![XIAO nRF52840のはんだ付け箇所を赤点で示したPCB](../nickey44a/images/xiao/01-xiao-solder-points.jpg)

位置決めには7ピンヘッダーを利用できます。ヘッダーは治具として使うだけなので、**ヘッダー自体ははんだ付けしません。**

![PCB、XIAO nRF52840、位置決め用7ピンヘッダー](../nickey44a/images/xiao/02-xiao-alignment-header.jpg)

7ピンヘッダーを差し込んでXIAOの位置を合わせ、反対側の端子を数か所はんだ付けします。位置が固定できたらヘッダーを外し、残りの端子をはんだ付けしてください。

![7ピンヘッダーでPCB上に位置決めしたXIAO nRF52840](../nickey44a/images/xiao/04-xiao-aligned-on-pcb.jpg)


<div class="callout callout-important" role="note" aria-label="重要">
  <p class="callout-title">ⓘ 重要</p>
  <p>裏側のスルーホールは開発者向けオプションです。通常ははんだ付け不要です。</p>
</div>


![alt text](images/xiao/05-xiao-solder-pads.jpg)

端子間をはんだでつなぐ「ブリッジ」や、はんだ不足がないことを十分に確認してください。



## 💾 ZMK Firmware

設定ファイルとキーマップは、[nixiy/zmk-config-nickey44a の `nickey44a_fix` ブランチ](https://github.com/nixiy/zmk-config-nickey44a/tree/nickey44a_fix)にあります。リポジトリの[`build.yaml`](https://github.com/nixiy/zmk-config-nickey44a/blob/nickey44a_fix/build.yaml)には、右用・左用・設定リセット用のビルド対象が定義されています。

- 右側: セントラル。PCやスマートフォンと直接通信します。
- 左側: ペリフェラル。右側を経由して通信します。

左右には、**同じビルドから生成された対応するFirmware**を書き込んでください。`nickey44a_fix` ブランチでGitHub Actionsを実行すると、次のUF2ファイルが成果物として生成されます。現時点では標準Firmwareの配布ファイルは配置していません。

- 左側: `nickey44a_l.uf2`
- 右側: `nickey44a_r.uf2`
- 設定リセット: `settings_reset.uf2`（左右接続やペアリングの接続情報をリセットするときに使用）

### DYA Studioを利用する場合

Nickey44A用リポジトリの設定と対応状況を確認してから利用してください。[DYA Studioの使い方]({{ '/guides/dya-studio/' | relative_url }})も参照できます。

### ⬇️ Firmwareの書き込み

左右を1台ずつ、データ通信対応のUSB Type-CケーブルでPCへ接続して作業します。

1. 左右それぞれのSeeed Studio XIAO nRF52840をUSBでPCへ接続します。
2. XIAOのリセットボタンを素早く2回押して、ブートローダードライブを表示します。
3. 左側には `nickey44a_l.uf2`、右側には `nickey44a_r.uf2` を、それぞれ対応するドライブへドラッグ＆ドロップします。

コピー後はドライブが自動的に閉じ、キーボードが再起動します。ブートローダーモードとUF2書き込みの詳しい説明は、[Firmwareの書き込み方法]({{ '/guides/firmware/' | relative_url }})を確認してください。

## ✅ ケースを閉じる前の動作確認

ケースを完全に組み立てる前に、はんだ付けとFirmwareの動作を確認します。ケース組み立て後に問題が判明すると、再度分解する必要があるためです。

1. 電池はまだ入れません。
2. USB Type-CでXIAOをPCへ接続します。
3. リセットボタンを素早く2回押し、ブートローダーが起動できることを確認します。
4. 左右それぞれへ対応するFirmwareを書き込みます。
5. 左右のXIAOが起動することを確認します。
6. 可能であれば、全キーの入力を確認します。
7. 問題がなければ、次のケース組み立てへ進みます。

<!-- TODO: ケース組み立て前にUSB接続して動作確認している写真を追加 -->

## 🧲 電池カバー固定用マグネットの取り付け

6 × 3 mmのマグネットは、ケースと電池カバーの専用穴へ**圧入**します。接着剤は通常不要です。

1. ケースと電池カバーのマグネット用穴を確認します。

   <!-- TODO: ケースのマグネット圧入位置が分かる写真を追加 -->

2. マグネットを穴へ水平に合わせ、指でまっすぐ押し込みます。

   <!-- TODO: 6×3mmマグネットを指で圧入している写真を追加 -->

3. 先に片側のマグネットを圧入します。次に取り付けるマグネットを取り付け済みのマグネットへ吸着させ、吸着している向きを確認します。
4. その向きを維持したまま、対応する穴へ圧入します。すべての組で繰り返します。

   <!-- TODO: 取り付け済みマグネットへ次のマグネットを吸着させ、極性を確認している写真を追加 -->

5. マグネットが奥まで入り、周囲から大きく飛び出していないことを確認します。

<div class="callout callout-important" role="note" aria-label="重要">
  <p class="callout-title">ⓘ 重要</p>
  <p>マグネットをすべて一度に、任意の向きで圧入しないでください。ケース側と電池カバー側が反発しないよう、必ず取り付け済みマグネットへ吸着させて極性を確認してから取り付けます。斜めになった状態で無理に押し込まないでください。</p>
</div>

<!-- TODO: ケースと電池カバーのマグネット取り付け完了状態の写真を追加 -->

## 🛠️ ケースへの取り付け

### 電源スイッチの状態

組み立て中および単4電池の装着時は、電源スイッチを**OFF**にしておきます。ON/OFFの物理的な方向は、写真で確認してから本文へ追記します。

左右とも下がOFF、上がONです。

![電源スイッチのONとOFFの方向](images/power-switch/01-power-switch-direction.jpg)

### 組み付け手順

<div class="callout callout-important" role="note" aria-label="重要">
  <p class="callout-title">ⓘ 重要</p>
  <p>電源スイッチのピンに負荷をかけないよう、電源スイッチカバーを先にボトムケースへ取り付けてからPCBを収めます。</p>
</div>

1. 電源スイッチカバーをボトムケースへ取り付けます。

   <!-- TODO: 電源スイッチカバーをボトムケースへ取り付ける向きと手順を追記 -->
   <!-- TODO: 電源スイッチカバーをボトムケースへ取り付けている写真を追加 -->

2. XIAO側からPCBをボトムケースに差し込み、ケースの縁に沿わせます。

   ![XIAO側からケースに差し込んだPCB](../nickey44a/images/assembly/01-pcb-position-xiao-side.jpg)

3. PCBを少し持ち上げながら、電源スイッチのピンをケースの穴にまっすぐ合わせます。

   ![電源スイッチのピンをケースの穴に合わせる](../nickey44a/images/assembly/02-pcb-align-power-switch.jpg)

4. 電源スイッチのピンが穴に入った状態を保ち、PCB全体を水平に押し込んでケースに収めます。

   ![ケースに収まったPCB](../nickey44a/images/assembly/03-pcb-seated-in-case.jpg)

5. ボトムケースへ収めたPCBの上にトッププレートを重ねます。

   <!-- TODO: トッププレート、PCB、ボトムケースの組み立て順序が分かる全体写真を追加 -->

6. ボトムケース側のねじ切りを利用して、M2 × 5 mmネジで固定します。ネジを締めすぎてケースやPCBを傷めないようにしてください。

   <!-- TODO: M2×5mmネジでケースを固定している写真を追加 -->

7. Choc v2スイッチの金属ピンが曲がっていないことを確認し、トッププレートとPCBへまっすぐ差し込みます。強い抵抗を感じる場合は無理に押し込まず、ピンの曲がりや位置を確認してください。

   <!-- TODO: Choc v2スイッチをトッププレートとPCBへまっすぐ挿入している写真を追加 -->

8. PCB裏側のホットスワップソケットが浮いたり外れたりしていないことを確認します。
9. キーキャップをキースイッチへまっすぐ取り付けます。

   <!-- TODO: キーキャップの向きと取り付け手順を追記 -->
   <!-- TODO: キーキャップを取り付けている写真を追加 -->

## 🔋 単4電池の装着

1. 電源スイッチがOFFであることを確認します。
2. PCBまたはケースの極性表示を確認します。

   ![単4電池の極性表示](images/battery/02-aaa-battery-polarity-reference.jpg)

3. 単4電池を正しい向きで入れます。

   ![ケース裏側から見た単4電池の装着状態](images/battery/03-aaa-battery-installed-bottom.jpg)
   ![ケース表側から見た単4電池の装着状態](images/battery/07-aaa-battery-installed-front.jpg)

4. 電池が端子へ正しく接触していることを確認します。
5. 電池カバーを取り付けます。

   ![開いた状態の電池カバー](images/battery/05-battery-cover-open.jpg)
   ![電池カバーを取り付ける向き](images/battery/04-battery-cover-alignment.jpg)
   ![取り付け完了した電池カバー](images/battery/06-battery-cover-installed.jpg)

6. 電源スイッチをONにして動作を確認します。

<!-- TODO: 電池カバー装着後の完成状態の写真を追加 -->
<!-- TODO: Nickey44Aで推奨する単4電池の種類（アルカリ/Ni-MH等）を確定後に記載 -->

## 📶 Bluetoothペアリング

PCやスマートフォンでBluetoothデバイスの追加画面を開き、`nickey44a`を選択します。

初回ペアリングでは、未登録のBluetoothスロットを選択してから、PCやスマートフォンのデバイス一覧で`nickey44a`を選択します。Bluetoothスロットやペアリング情報の消去は、[Bluetoothの操作・ペアリング]({{ '/guides/bluetooth/' | relative_url }})を確認してください。

### 🔍 デバイス一覧に表示されない場合

`BT CLR ALL`を実行して、ペアリング情報を初期化します。詳しいキー操作は、[Bluetoothの操作・ペアリング]({{ '/guides/bluetooth/' | relative_url }})を確認してください。

## ✅ キー入力テスト

組み立て後は[キーボードテスト](https://www.onlinemictest.com/ja/keyboard-test)などを使い、すべてのキーが入力できることを確認します。

## 🗺️ デフォルトキーマップ

Nickey44A用のキーマップは、[`main` ブランチのキーマップ図](https://github.com/nixiy/zmk-config-nickey44a/blob/main/keymap-drawer/nickey44a.svg)を参照してください。

## ✍️ キーマップを変更する（任意）

キーマップの変更は、[キーマップの変更方法]({{ '/guides/keymap/' | relative_url }})を参照してください。Nickey44Aでは、[nixiy/zmk-config-nickey44a](https://github.com/nixiy/zmk-config-nickey44a)を自分のアカウントへForkし、GitHub Actionsで生成したFirmwareを書き込みます。

## 🧯 トラブルシューティング

USB接続、ブートローダー、Bluetoothに共通する基本的な対処は、[共通トラブルシューティング]({{ '/guides/troubleshooting/' | relative_url }})も確認してください。

### 🔌 有線接続する

右側のXIAOをUSBでPCへ接続すると、有線キーボードとして使用できます。左右間は無線で繋がります。

### 🧩 左右が接続できなくなった

Firmwareの変更後などに左右間の接続が復旧しない場合は、`settings_reset.uf2`を左右両方へ書き込んで接続情報をリセットしてから、左側へ`nickey44a_l.uf2`、右側へ`nickey44a_r.uf2`を書き直します。

### 1キーだけ反応しない

次を確認してください。

- Choc v2スイッチの金属ピンが曲がっていないか
- スイッチが最後まで差し込まれているか
- PCB裏側のChoc v2ソケットが浮いていないか
- ソケットのはんだ付けに不足やブリッジがないか

### 片側のキーがすべて反応しない

次を確認してください。

- 電源スイッチがONになっているか
- 単4電池の向きが正しいか
- XIAOが起動しているか
- 左右に対応する`nickey44a_l.uf2`／`nickey44a_r.uf2`を書き込んだか
- 左右の接続情報を`settings_reset`でリセットする必要がないか

### 左右が接続しない

上記「左右が接続できなくなった」の`settings_reset`手順を実施してから、左右それぞれのFirmwareを書き直してください。

## 🎉 完成

次をすべて確認できれば完成です。

- [ ] 左側の全キーが入力できる
- [ ] 右側の全キーが入力できる
- [ ] 左右が無線接続される
- [ ] USB接続で動作する
- [ ] Bluetoothで`nickey44a`へ接続できる
- [ ] 単4電池で動作する
- [ ] 左右の電源スイッチが正常に機能する

不具合や不明点は、[Nickey Discordサーバー](https://discord.com/invite/SE8h8wK3)で相談できます。

### 🔗 関連リンク

- 🛍️ **BOOTH:** [Nickey44A キット版](https://potamega.booth.pm/items/8744351)
- 🛍️ **BOOTH:** [Nickey44A 完成品](https://potamega.booth.pm/items/8744204)
