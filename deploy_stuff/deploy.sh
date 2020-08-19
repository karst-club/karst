ssh karst@karst.club
cd karst
git stash
git pull origin master
git stash pop
npm install
npm run build
sudo systemctl restart karst_api
exit
