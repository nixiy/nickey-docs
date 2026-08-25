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

jekyll serve --livereload --baseurl /
