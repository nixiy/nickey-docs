---
layout: default
title: キーマップの変更方法
permalink: /guides/keymap/
---

# キーマップの変更方法

GitHubとZMK Keymap Editorを使い、ZMK Firmwareのキーマップを変更して書き込む基本手順です。対応するリポジトリ、設定ファイル、生成されるFirmwareは製品ごとに異なります。

## 1. GitHubアカウントを用意する

キーマップを保存してFirmwareをビルドするにはGitHubアカウントが必要です。持っていない場合は、[GitHubアカウントを作成](https://github.com/signup)してください。

## 2. 製品のFirmwareリポジトリをForkする

製品のビルドガイドにあるFirmwareリポジトリを開き、GitHubの「Fork」から自分のアカウントへ複製します。以後の編集とビルドは、このForkしたリポジトリで行います。

![GitHubリポジトリ画面のForkボタンの例]({{ '/nickey44/images/firmware/39-github-fork-button.jpg' | relative_url }})

## 3. ZMK Keymap Editorで編集する

[ZMK Keymap Editor](https://nickcoutsos.github.io/keymap-editor/)を開き、Forkしたリポジトリの設定を読み込みます。キーを選択して割り当てを変更し、編集内容を保存してください。

製品によっては、あらかじめ設定ファイルの指定や追加の準備が必要です。各製品のリポジトリREADMEを確認してください。

![ZMK Keymap Editorの編集画面例]({{ '/nickey44/images/firmware/40-keymap-editor.jpg' | relative_url }})

## 4. GitHub ActionsでFirmwareをビルドする

Forkしたリポジトリの「Actions」を開き、変更に対応するワークフローを選択します。緑色のチェックが付いて成功した最新のワークフローを開いてください。

![GitHubリポジトリのActionsタブの例]({{ '/nickey44/images/firmware/41-github-actions-tab.jpg' | relative_url }})

![成功したGitHub Actionsワークフローの例]({{ '/nickey44/images/firmware/42-github-actions-run.jpg' | relative_url }})

## 5. Artifactsをダウンロードして書き込む

ワークフロー詳細の「Artifacts」からFirmwareをダウンロードして展開します。生成されたUF2ファイルを、製品のビルドガイドに従って各コントローラーへ書き込みます。

![GitHub ActionsのArtifactsの例]({{ '/nickey44/images/firmware/43-firmware-artifact.jpg' | relative_url }})

書き込み手順の詳細は、[Firmwareの書き込み方法]({{ '/guides/firmware/' | relative_url }})を参照してください。
