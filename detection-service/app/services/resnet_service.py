import torch
import torch.nn as nn
from torchvision import models
import os

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model():
    model = models.resnet50(weights=None)
    for param in model.parameters():
        param.requires_grad = False

    model.fc = nn.Sequential(
        nn.Linear(2048, 512),
        nn.ReLU(),
        nn.Dropout(0.3),
        nn.Linear(512, 88)
    )

    model_path = os.path.join(
        os.path.dirname(__file__),
        '..', 'models', 'test_model.pth'  # Utiliser le modèle de test
    )

    try:
        model.load_state_dict(torch.load(model_path, map_location=device, weights_only=True))
        print("✅ Modèle de test chargé")
    except Exception as e:
        print(f"Erreur lors du chargement du modèle de test: {e}")
        raise

    model.to(device)
    model.eval()
    return model

model = load_model()