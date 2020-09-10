#!/usr/bin/env bash

cd karst
git pull origin master
npm install
npm run build
source karst/bin/activate
pip3 install -r requirements.txt
deactivate
sudo systemctl restart karst_api
