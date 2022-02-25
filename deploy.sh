#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd docs/.vitepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:artiely/vitepress-blog.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>

# github pages
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master:gh-pages

# gitee
# git push -f git@gitee.com:<USERNAME>/<USERNAME>.git master
cd -