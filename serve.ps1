$ErrorActionPreference = "Stop"

if (-not (Get-Command bundle -ErrorAction SilentlyContinue)) {
    throw "Ruby and Bundler are required. Install Ruby+Devkit with RubyInstaller, then run: gem install bundler"
}

bundle check
if ($LASTEXITCODE -ne 0) {
    bundle install
    if ($LASTEXITCODE -ne 0) {
        throw "Gem installation failed."
    }
}

bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000
