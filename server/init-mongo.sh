#!/bin/sh
set -e

echo "Initialisation MongoDB"

if [ ! -d "/app/data" ]; then
  echo "Le dossier /app/data n'existe pas !"
  exit 1
fi

for file in /app/data/*.json; do
  collection=$(basename "$file" .json)
  echo "Import de la collection $collection..."
  mongoimport \
    --uri="mongodb://root:1234@mongo:27017/eventhub?authSource=admin" \
    --collection="$collection" \
    --jsonArray \
    --drop \
    --file="$file"
done

echo "Import terminé !"

echo "Lancement du serveur"
node dist/server.js
