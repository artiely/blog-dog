#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'



# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  记得修改docs/vuepress/config下的base为/<REPO>/
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# gitee
# git push -f git@gitee.com:<USERNAME>/<USERNAME>.git master
cd -