# Utiliser une image officielle Node.js
FROM node:18

# Créer le dossier de l'app dans le conteneur
WORKDIR /app

# Copier package.json + lock
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Exposer le port utilisé
EXPOSE 3002

# Lancer le serveur
CMD ["node", "index.js"]
