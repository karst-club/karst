ssh karst@karst.club
cd karst
git stash
git pull origin master
git stash pop
npm install
npm run build
source karst/bin/activate
pip3 install -r requirements.txt
deactivate
sudo systemctl restart karst_api
exit
