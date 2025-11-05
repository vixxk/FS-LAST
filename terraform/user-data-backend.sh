#!/bin/bash
set -e

apt-get update
apt-get install -y curl git nodejs npm

curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

npm install -g pm2

cd /home/ubuntu
git clone https://github.com/yourusername/fullstack-jwt-auth-app.git
cd fullstack-jwt-auth-app/backend

npm install

pm2 start server.js --name jwt-backend
pm2 startup systemd
pm2 save

echo "Backend deployment complete"
