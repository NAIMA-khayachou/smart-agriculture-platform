# Guide de Démarrage - Smart Agriculture Platform

## ✅ Corrections Appliquées

1. ✅ **requirements.txt** corrigé (encodage UTF-16 → UTF-8)
2. ✅ **CORS** ajouté à l'API FastAPI
3. ✅ **Service de modèle** créé pour charger ResNet50
4. ✅ **Service de traitement d'images** créé
5. ✅ **Routes API** pour la détection de maladies
6. ✅ **Configuration Nginx** pour le proxy API
7. ✅ **docker-compose.yml** complété

## 🚀 Lancement du Projet

### 1. Construire et démarrer les conteneurs
```bash
docker-compose up --build
```

### 2. Accéder aux services
- **Frontend**: http://localhost
- **API**: http://localhost:8000
- **Documentation API**: http://localhost:8000/docs

## 📡 Endpoints API Disponibles

### Santé du service
```bash
GET http://localhost:8000/health
```

### Détection de maladie
```bash
POST http://localhost:8000/api/v1/detect
Content-Type: multipart/form-data
Body: file=<image.jpg>
```

### Liste des classes
```bash
GET http://localhost:8000/api/v1/classes
```

## 📝 Notes Importantes

### Classes de Maladies (à adapter)
Le modèle est configuré avec 10 classes par défaut. Modifiez la liste dans `detection-service/app/main.py` selon votre dataset:
- Healthy
- Bacterial Spot
- Early Blight
- Late Blight
- Leaf Mold
- Septoria Leaf Spot
- Spider Mites
- Target Spot
- Yellow Leaf Curl Virus
- Mosaic Virus

### Modèle Utilisé
Le système charge automatiquement: `models/resnet50_plantdoc_final.pth`

Si vous voulez utiliser un autre modèle, modifiez le chemin dans `app/main.py`.

## 🔧 Développement

### Backend uniquement
```bash
cd detection-service
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend uniquement
```bash
cd frontend
npm install
npm start
```

## 🐛 Dépannage

### Le modèle ne se charge pas
Vérifiez que le fichier `.pth` existe et que le nombre de classes correspond.

### Erreur CORS
Vérifiez que `allow_origins` dans `main.py` inclut votre domaine frontend.

### Port déjà utilisé
Modifiez les ports dans `docker-compose.yml`.
