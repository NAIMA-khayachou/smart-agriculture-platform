import torch
import torch.nn as nn
from torchvision import models
from pathlib import Path
from typing import Dict, List

class ModelService:
    def __init__(self):
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.class_names = []
        
    def load_model(self, model_path: str, num_classes: int):
        """Charge un modèle ResNet50 pré-entraîné"""
        try:
            self.model = models.resnet50(weights=None)
            # Créer l'architecture ResNet50
            self.model.fc = nn.Sequential(
                  nn.Linear(2048, 512),
                  nn.ReLU(),
                  nn.Dropout(0.3),
                  nn.Linear(512, 88)
    )
            
            # Charger les poids
            checkpoint = torch.load(model_path, map_location=self.device)
            
            # Gérer différents formats de checkpoint
            if isinstance(checkpoint, dict):
                if 'model_state_dict' in checkpoint:
                    self.model.load_state_dict(checkpoint['model_state_dict'])
                elif 'state_dict' in checkpoint:
                    self.model.load_state_dict(checkpoint['state_dict'])
                else:
                    self.model.load_state_dict(checkpoint)
            else:
                self.model.load_state_dict(checkpoint)
            
            self.model.to(self.device)
            self.model.eval()
            print(f"✅ Modèle chargé avec succès depuis {model_path}")
            return True
        except Exception as e:
            print(f"❌ Erreur lors du chargement du modèle: {e}")
            return False
    
    def set_class_names(self, class_names: List[str]):
        """Définir les noms des classes"""
        self.class_names = class_names
    
    def predict(self, image_tensor: torch.Tensor) -> Dict:
        """Effectue une prédiction sur une image"""
        if self.model is None:
            raise ValueError("Le modèle n'est pas chargé")
        
        with torch.no_grad():
            image_tensor = image_tensor.to(self.device)
            outputs = self.model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
            
            predicted_class = predicted.item()
            confidence_score = confidence.item()
            
            return {
                "class_id": predicted_class,
                "class_name": self.class_names[predicted_class] if predicted_class < len(self.class_names) else f"Class_{predicted_class}",
                "confidence": float(confidence_score)
            }

# Instance globale
model_service = ModelService()
