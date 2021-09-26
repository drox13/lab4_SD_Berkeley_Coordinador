docker exec instancia2 bash -c "git pull; pm2 stop index.js; pm2 start index.js"
docker exec instancia3 bash -c "git pull; pm2 stop index.js; pm2 start index.js"