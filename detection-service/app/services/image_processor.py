import torch
from PIL import Image
from torchvision import transforms
import io

class ImageProcessor:
    def __init__(self):
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
    
    def process_image(self, image_bytes: bytes) -> torch.Tensor:
        """Convertit les bytes d'une image en tensor PyTorch"""
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        image_tensor = self.transform(image).unsqueeze(0)
        return image_tensor

# Instance globale
image_processor = ImageProcessor()
