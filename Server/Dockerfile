# Utilise l'image officielle Node.js comme base
FROM node:14

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie les fichiers du projet dans le conteneur
COPY . .

# Expose le port sur lequel l'API sera accessible
EXPOSE 3000

# Commande pour démarrer l'API
CMD ["node", "server.js"]
