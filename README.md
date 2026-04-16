# Event-Hub | Plateforme de Gestion d'Événements

![Version](https://img.shields.io/badge/Version-1.3.4-red)
![Build Status](https://img.shields.io/badge/Jenkins-Passing-brightgreen)
![SonarQube](https://img.shields.io/badge/SonarQube-Quality%20Gate%20OK-success)
![AWS](https://img.shields.io/badge/Instance-AWS%20EC2-FF9900)

**Event-Hub** est une application full-stack moderne conçue pour la planification et la gestion d'événements. Cette version 1.3 marque une transition vers une architecture robuste, type-safe et automatisée via un pipeline CI/CD complet.

---

## Stack Technique
![Vite](https://img.shields.io/badge/Vite-0044aa)
![React](https://img.shields.io/badge/React-FFAA00)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)
![MUI](https://img.shields.io/badge/MUI-007FFF)
![Node.js](https://img.shields.io/badge/Node.js-339933)
![Express](https://img.shields.io/badge/Express-000000)
![Prisma](https://img.shields.io/badge/Prisma-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-AA67FF)
![MongoDB](https://img.shields.io/badge/MongoDB-AAAA00)
![Docker](https://img.shields.io/badge/Docker-2496ED)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939)
![SonarQube](https://img.shields.io/badge/SonarQube-131313)


### Frontend
* **Vite.js** & **React 18** : Pour un environnement de développement ultra-rapide.
* **TypeScript** : Typage statique pour une maintenance facilitée.

### Backend & Data
* **Node.js (Express)** & **TypeScript**.
* **Prisma** : Interface type-safe avec la base de données.
* **PostgreSQL** : Base de données relationnelle principale.
* **MongoDB** : Stockage documentaire pour la flexibilité des données non-structurées.

### DevOps & Cloud
* **Docker & Docker Compose** : Conteneurisation de l'ensemble des services.
* **Jenkins** : Orchestration du pipeline CI/CD.
* **SonarQube** : Analyse de la qualité du code et des vulnérabilités.
* **AWS (EC2/EBS)** : Hébergement haute performance.

---

### Conception & Modélisation

Le projet repose sur une analyse rigoureuse utilisant la méthode **MERISE** pour la partie relationnelle et **PlantUML** pour la documentation des processus.

### Architecture des données
L'application couple la puissance du relationnel (**PostgreSQL**) pour la gestion des utilisateurs et des réservations, avec la flexibilité du NoSQL (**MongoDB**) pour les logs ou les métadonnées variables.

---

### Workflow CI/CD

Chaque mise à jour du code suit un cycle automatisé pour garantir la qualité de la production :

1.  **Code Push** : Envoi vers le dépôt GitHub.
2.  **Jenkins Trigger** : Récupération automatique du code sur l'instance AWS.
3.  **SonarQube Analysis** : Scan de la qualité (Bugs, Code Smells, Security Hotspots).
4.  **Docker Build** : Création des nouvelles images Backend et Frontend.
5.  **Deployment** : Redémarrage des conteneurs mis à jour.



---

## Installation & Simulation

### Pré-requis
* **Docker Desktop** (Windows, Mac ou Linux).
* Configuration des variables d'environnement dans un fichier `.env`.

### Lancement local
```bash
# Cloner le projet
git clone [https://github.com/xdam99/event-hub.git](https://github.com/xdam99/event-hub.git)

# Lancer tous les services à la racine du projet
docker-compose up -d --build