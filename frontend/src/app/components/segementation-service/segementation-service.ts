import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { segementation_service } from '../../services/service-segementation'; // 🎯 On importe ton NOUVEAU service ici

@Component({
  selector: 'app-section-localisation-maladie',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NgIf,
    NgClass
  ],
  templateUrl: './segementation-service.html',
  styleUrl: './segementation-service.css'
})
export class LocalisationMaladieComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isSegmenting: boolean = false;
  segmentationResult: any = null;

  constructor(
    private segmentationService: segementation_service, // 🎯 Injection de ton service de segmentation
    private cdr: ChangeDetectorRef
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) { this.processImage(file); }
  }

  processImage(file: File): void {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.sendToUNetBackend(file);
      this.cdr.detectChanges(); 
    };
    reader.readAsDataURL(file);
  }

  sendToUNetBackend(file: File): void {
    this.isSegmenting = true;
    this.segmentationResult = null;
    this.cdr.detectChanges();

    this.segmentationService.predictDisease(file).subscribe({ 
      next: (response) => {
        console.log('Données reçues du modèle UNet :', response);
        
        if (response.success) {
          this.segmentationResult = {
            // 🎯 Clé modifiée : 'mask' au lieu de 'mask_bytes'
            maskUrl: response.mask ? 'data:image/png;base64,' + response.mask : this.imagePreview, 
            
            // 🎯 Clé modifiée : 'infection_percentage' au lieu de 'surface_affectee'
            affectedArea: response.infection_percentage !== undefined ? response.infection_percentage : '0'
          };
        } else {
          console.error('Le backend a renvoyé success: false');
        }

        this.isSegmenting = false;
        this.cdr.detectChanges(); // Force le rendu immédiat
      },
      error: (err) => {
        console.error('Erreur lors de la segmentation UNet', err);
        this.isSegmenting = false;
        this.cdr.detectChanges();
      }
    });
  }
  resetSegmentation(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.segmentationResult = null;
    this.cdr.detectChanges();
  }
}