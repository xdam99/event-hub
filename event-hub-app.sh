echo "********************************"
echo "CONSTRUCTION DE L'APPLICATION SUR LE PORT 3000"
docker compose up -f docker-compose.jenkins.yml --build -d
echo "********************************"
date
echo "********************************"
