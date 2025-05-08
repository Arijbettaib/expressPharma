# 💊 PharmaExpress – Microservices pour Commande et Livraison de Médicaments

PharmaExpress est une plateforme décentralisée de commande de médicaments, conçue en architecture microservices, avec communication REST, gRPC, GraphQL, Kafka et sécurisation par JWT.

---

## 🏗️ Architecture Microservices

```mermaid
graph TD
  subgraph Frontend
    UI[Interface Client]
  end

  subgraph Gateway (Apollo GraphQL)
    GW
  end

  subgraph Services
    AUTH(Auth Service)
    ORDER(Order Service)
    PHARMA(Pharma Service - gRPC)
    NOTIF(Notification Service - Kafka)
  end

  subgraph Infra
    DB[(MongoDB)]
    KAFKA[(Kafka)]
    ZK[(Zookeeper)]
  end

  UI --> GW
  GW --> AUTH
  GW --> ORDER
  ORDER --> DB
  ORDER --> KAFKA
  KAFKA --> PHARMA
  PHARMA --> KAFKA
  KAFKA --> NOTIF
```

---

## 🧪 Tech Stack

| Composant             | Stack                                      |
|-----------------------|--------------------------------------------|
| Authentification      | Node.js + Express + JWT + MongoDB          |
| Commandes             | Node.js + Express + MongoDB                |
| Validation Pharma     | gRPC (Node.js) + Kafka                     |
| Notification          | Kafka Consumer (Node.js)                   |
| API Gateway           | Apollo Server (GraphQL) + REST + JWT       |
| Base de données       | MongoDB (Docker container)                 |
| Message Broker        | Kafka + Zookeeper (Docker container)       |

---

## 🚀 Lancement rapide

```bash
# 1. Cloner le projet
git clone https://github.com/votre-utilisateur/pharmaexpress.git
cd pharmaexpress

# 2. Lancer tous les services
docker-compose up --build
```

---

## 📂 Structure du projet

```
pharmaexpress/
│
├── auth-service/         # Auth REST API
├── order-service/        # Commandes (CRUD + Kafka)
├── pharma-service/       # Validation (gRPC + Kafka)
├── notification-service/ # Notifications Kafka
├── gateway/              # GraphQL Gateway + sécurité
├── proto/                # Fichier commande.proto pour gRPC
├── docker-compose.yml    # Orchestration Docker
└── README.md             # Documentation
```

---

## 🔐 Auth-Service – Endpoints REST

| Méthode | Route           | Description                   |
|---------|------------------|-------------------------------|
| POST    | /api/auth/register | Inscription utilisateur      |
| POST    | /api/auth/login    | Connexion + JWT              |
| GET     | /api/auth/profile  | Récupérer profil (JWT req.) |

---

## 📦 Order-Service – Endpoints REST

| Méthode | Route       | Description               |
|---------|-------------|---------------------------|
| POST    | /api/orders | Créer une commande        |
| GET     | /api/orders | Récupérer mes commandes   |

---

## 💊 Pharma-Service – gRPC (commande.proto)

```proto
service PharmaService {
  rpc ProcessOrder(OrderRequest) returns (OrderResponse);
}
```

---

## 📢 Notification-Service – Kafka

- 🔄 Consomme le topic `order_confirmed`
- 📨 Affiche en console ou simule un email/sms

---

## 🌐 Gateway – GraphQL (Apollo)

### Exemple de requête `login` :
```graphql
mutation {
  login(email: "test@test.com", password: "123456")
}
```

### Exemple de requête `getUser` :
```graphql
query {
  getUser(token: "xxx.yyy.zzz") {
    id
    name
    email
  }
}
```

---

## ✅ Tests Postman

- Collection fournie dans `/docs/PharmaExpress.postman_collection.json`
- Tests : register, login, créer commande, confirmer via gRPC, réception Kafka

---

## 📷 Captures & schémas

> À intégrer : schéma d’architecture, captures Docker, tests Postman

---

## 👤 Auteur

- **Nom** : Arij Bettaieb
- **GitHub** : [github.com/arijbettaieb](https://github.com/arijbettaieb)

---

## 📌 Remarques

- Tous les services communiquent via `docker-compose` (nom du container = nom du service)
- Assurez-vous que les ports ne sont pas utilisés localement (3000, 3001, 3002, 4000, 50051, 9092…)

---

