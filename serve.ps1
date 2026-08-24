$ErrorActionPreference = "Stop"

if (-not (Get-Command bundle -ErrorAction SilentlyContinue)) {
    throw "RubyとBundlerが必要です。RubyInstallerでRuby+Devkitをインストールし、'gem install bundler' を実行してください。"
}

bundle check
if ($LASTEXITCODE -ne 0) {
    bundle install
    if ($LASTEXITCODE -ne 0) {
        throw "Gemのインストールに失敗しました。"
    }
}

jekyll serve --livereload --baseurl=
