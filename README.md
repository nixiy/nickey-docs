# nickey-docs

Nickey44のドキュメントを管理するリポジトリです。

公開ページ:

- [サイトトップ](https://nixiy.github.io/nickey-docs/)
- [Nickey44 ビルドガイド](https://nixiy.github.io/nickey-docs/nickey44/)
- [Nickey44A ビルドガイド](https://nixiy.github.io/nickey-docs/nickey44a/)

## Contents

- [Nickey44 ビルドガイド](nickey44/)
- [Nickey44A ビルドガイド](nickey44a/)

## Local preview

RubyとBundlerを用意した後、PowerShellで次を実行します。

```powershell
.\serve.ps1
```

起動後、<http://127.0.0.1:4000/nickey44/> を開いてください。

## 画像の最適化

JPEG画像を追加・更新した際は、公開用の容量を抑えるため、Linux環境で[ImageMagick](https://imagemagick.org/)を使って最適化します。以下は `assets`、`nickey44`、`nickey44a` 配下のJPEGを対象に、長辺を最大1920 px、品質を82に揃えるコマンドです。

```bash
find assets nickey44 nickey44a -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0 |
  while IFS= read -r -d '' file; do
    tmp="${file%.*}.optimized.jpg"
    magick "$file" -auto-orient -resize '1920x1920>' -strip -interlace Plane -quality 82 "$tmp"

    if [ "$(stat -c%s "$tmp")" -lt "$(stat -c%s "$file")" ]; then
      mv "$tmp" "$file"
    else
      rm "$tmp"
    fi
  done
```

元ファイルより小さくなる画像だけを置き換えるため、画面キャプチャなど容量が増える画像はそのまま保持されます。処理後は次のコマンドで確認してください。

```bash
git diff --stat
bundle exec jekyll build --strict
```
