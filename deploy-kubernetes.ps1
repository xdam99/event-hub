Write-Host "Démarrage du déploiement sélectif..." -ForegroundColor Blue

# 1. Storage
kubectl apply -f k8s/storage/postgres-pvc.yaml

# 2. Database
kubectl apply -f k8s/database/postgres-secret.yaml
kubectl apply -f k8s/database/postgres-deployment.yaml
kubectl apply -f k8s/database/mongo-deployment.yaml
sleep 2

# 3. Backend
kubectl apply -f k8s/backend/backend-config.yaml
kubectl apply -f k8s/backend/backend-secret.yaml
kubectl apply -f k8s/backend/backend-service.yaml
kubectl apply -f k8s/backend/migration-job.yaml
kubectl apply -f k8s/backend/backend-deployment.yaml


kubectl apply -f k8s/frontend/frontend-deployment.yaml
kubectl apply -f k8s/frontend/frontend-service.yaml
kubectl apply -f k8s/frontend/nginx-configmap.yaml
kubectl apply -f k8s/frontend/nginx-deployment.yaml
kubectl apply -f k8s/frontend/nginx-service.yaml

Write-Host "Déploiement ciblé terminé !" -ForegroundColor Green