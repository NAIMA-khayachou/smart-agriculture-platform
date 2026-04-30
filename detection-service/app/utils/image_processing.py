import torch
import torchvision.transforms as transforms
from PIL import Image
import io

image_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def process_image(file_bytes: bytes) -> torch.Tensor:
    image  = Image.open(io.BytesIO(file_bytes)).convert('RGB')
    tensor = image_transform(image)
    tensor = tensor.unsqueeze(0)
    return tensor