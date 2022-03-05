# just to get us all at the same starting point
git checkout master

# delete your build folder
rm -rf dist/

# build the project
yarn build

# magic
git push origin `git subtree split --prefix dist master`:gh-pages --force

# cd to dist folder
cd dist

# add all
git add --all

# commit message to deploy
git commit -m "deploy via gh-pages"

# ultimately push
git push origin gh-pages