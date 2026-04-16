#  Smart Agriculture Platform

Bienvenue sur le projet **Smart Agriculture Platform**. Cette plateforme est un système d'aide à la décision basé sur l'IA pour analyser les maladies des plantes et fournir des prédictions de rendement.

##  Architecture du Projet

Le projet utilise une architecture en microservices conteneurisée avec **Docker** :
* **Frontend** : Développé avec **Angular 19** et servi par Nginx.
* **API (Detection Service)** : Développé avec **FastAPI**, gérant les modèles de Deep Learning (EfficientNetB0).

---

##  Prérequis

Avant de commencer, assurez-vous d'avoir installé :
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Git](https://git-scm.com/)

##  Installation et Lancement

1. **Cloner le projet**
   ```bash
   git clone [https://github.com/votre-username/smart-agriculture-platform.git](https://github.com/votre-username/smart-agriculture-platform.git)
   cd smart-agriculture-platform
