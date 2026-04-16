# Étape 1 : Build de l'application Angular
FROM node:20 AS build-step
WORKDIR /app

# Copier les fichiers de configuration npm
COPY package*.json ./
RUN npm install

# Copier tout le code source du frontend
COPY . .

# Compiler le projet en mode production
RUN npm run build --configuration=production

# Étape 2 : Utilisation de Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers compilés depuis l'étape précédente vers le dossier Nginx
# Note : vérifiez bien le chemin 'dist/frontend/browser' selon votre version d'Angular
COPY --from=build-step /app/dist/frontend/browser /usr/share/nginx/html

# Exposer le port 80 (port par défaut de Nginx)
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]