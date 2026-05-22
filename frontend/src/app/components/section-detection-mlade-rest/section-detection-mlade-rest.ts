import { Component, ChangeDetectorRef } from '@angular/core'; // <-- Import de ChangeDetectorRef
import { CommonModule, NgIf, NgClass } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import { MatIconModule } from '@angular/material/icon';     
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlantService } from '../../services/detection-maladie-agriculteur'; 

@Component({
  selector: 'app-section-detection-mlade-rest',
  standalone: true,
  imports: [
    CommonModule,             
    HttpClientModule,         
    NgIf,                     
    NgClass,                  
    MatIconModule,            
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './section-detection-mlade-rest.html',
  styleUrl: './section-detection-mlade-rest.css',
})
export class DetectionAgriculteurComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isAnalyzing: boolean = false;
  analysisResult: any = null;

  // On injecte ChangeDetectorRef dans le constructeur
  constructor(
    private plantService: PlantService,
    private cdr: ChangeDetectorRef 
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) { this.processImage(file); }
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) { this.processImage(file); }
  }

  processImage(file: File): void {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.sendToResNetBackend(file);
      this.cdr.detectChanges(); // Force le rendu de l'aperçu ou du spinner de scan
    };
    reader.readAsDataURL(file);
  }

  sendToResNetBackend(file: File): void {
    this.isAnalyzing = true;
    this.analysisResult = null; 
    this.cdr.detectChanges(); // Force l'apparition de l'état "isAnalyzing" (le scan)

    this.plantService.predictDisease(file).subscribe({
      next: (response) => {
        console.log('Données reçues du modèle ResNet :', response);
        const confidenceNumber = parseFloat(response.confiance) || 0;
        
        this.analysisResult = {
          className: response.prediction,
          confidence: confidenceNumber,
          isHealthy: response.statut === 'sain' || response.statut === 'healthy'
        };

        this.isAnalyzing = false; 
        
        // 🎯 LE REVIREMENT : On ordonne explicitement à Angular de rafraîchir le DOM maintenant
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Erreur lors de la communication avec l\'API ResNet :', err);
        this.isAnalyzing = false;
        this.cdr.detectChanges();
      }
    });
  }

  formatClassName(rawName: string): string {
    if (!rawName) return '';
    return rawName;
  }

  resetScan(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.analysisResult = null;
    this.cdr.detectChanges(); // Force le retour à la zone de dépôt initiale
  }
}