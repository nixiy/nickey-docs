1. {{ include.controller }}をUSBでPCへ接続します。
2. リセットボタンを素早く2回押します。
3. ブートローダードライブがエクスプローラーに表示されることを確認します。

{% if include.image %}
<p><img src="{{ include.image | relative_url }}" alt="{{ include.image_alt }}"></p>
{% endif %}
