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
        '..', 'models', 'best_model_finetuned.pth'
    )

    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    print("✅ Modèle chargé")
    return model

model = load_model()