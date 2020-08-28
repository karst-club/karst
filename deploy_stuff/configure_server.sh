# Commands I ran on the production server (debian)

# Connect as root
apt-get update
apt-get install ufw
ufw allow OpenSSH
ufw enable

adduser karst
usermod -aG sudo karst
mkdir /home/karst/.ssh
cp ~/.ssh/authorized_keys /home/karst/.ssh/authorized_keys
chown -R karst:karst /home/karst/.ssh

# Logout and re-connect as karst

ssh-keygen -t rsa -b 4096 -C "admin@karst.club"
# Then I added public key to my GitHub profile

sudo apt-get update
sudo apt-get install \
    git \
    nginx \
    python3-acme \
    python3-certbot \
    python3-mock \
    python3-openssl \
    python3-pkg-resources \
    python3-pyparsing \
    python3-zope.interface \
    python3-certbot-nginx \
    nodejs \
    npm \
    python3-pip \
    python3-venv \
    virtualenv \
    policykit-1

sudo ufw allow 'Nginx Full'

git clone git@github.com:sarah-johnson/karst.git

cd karst

python3 -m venv karst
source karst/bin/activate
pip install -r requirements.txt
pip install gunicorn

npm install
npm run build

ln -s . /var/www/karst
