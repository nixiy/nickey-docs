GitHubでファームウェアをカスタマイズするには、GitHubアカウントが必要です。持っていない場合は、事前に[GitHubアカウントを作成](https://github.com/signup)してください。

作業の流れは次のとおりです。

1. GitHubアカウントを用意する
2. [{{ include.repository_name }}]({{ include.repository_url }})を自分のアカウントへForkする
3. ZMK Keymap Editorで編集する
4. GitHub Actionsでビルドする
5. Artifactsからファームウェアをダウンロードする
6. {{ include.controller }}へ対応するUF2ファイルを書き込む

まず、[{{ include.repository_name }}]({{ include.repository_url }})を自分のアカウントへForkします。

<p><img src="{{ include.fork_image | relative_url }}" alt="{{ include.fork_image_alt }}"></p>

[ZMK Keymap Editor](https://nickcoutsos.github.io/keymap-editor/)を使うと、ブラウザ上でキー割り当てを変更できます。事前設定については、ファームウェアリポジトリのREADMEも確認してください。

<p><img src="{{ include.editor_image | relative_url }}" alt="{{ include.editor_image_alt }}"></p>

変更を保存した後は、GitHubリポジトリの「Actions」を開きます。

<p><img src="{{ include.actions_image | relative_url }}" alt="{{ include.actions_image_alt }}"></p>

成功を示す緑のチェックが付いた最新のワークフローを選びます。

<p><img src="{{ include.workflow_image | relative_url }}" alt="{{ include.workflow_image_alt }}"></p>

ワークフロー詳細の「Artifacts」からファームウェアをダウンロードして展開し、対応するUF2ファイルを書き込みます。

<p><img src="{{ include.artifact_image | relative_url }}" alt="{{ include.artifact_image_alt }}"></p>
