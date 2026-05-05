import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectionService, DetectionResult } from '../../services/detection.service';

@Component({
  selector: 'app-page-segementation',
  imports: [CommonModule],
  templateUrl: './page-segementation.html',
  styleUrl: './page-segementation.css',
})
export class PageSegementation {
  previewUrl    = signal<string | null>(null);
  maskUrl      = signal<string | null>(null);
  private maskBlob: Blob | null = null;
  selectedFile  = signal<File | null>(null);
  detection     = signal<DetectionResult | null>(null);
  loading       = signal(false);
  analyzed      = signal(false);
  error         = signal<string | null>(null);
  showMask      = signal(true);
  maskOpacity   = signal(0.6);

  constructor(private detectionService: DetectionService) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.loadFile(file);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file?.type.startsWith('image/')) this.loadFile(file);
  }

  onDragOver(e: DragEvent): void { e.preventDefault(); }

  private loadFile(file: File): void {
    this.selectedFile.set(file);
    this.analyzed.set(false);
    this.maskUrl.set(null);
    this.detection.set(null);
    this.error.set(null);
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  analyze(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.loading.set(true);
    this.error.set(null);

    // Étape 1 : détection de la maladie (ResNet50)
    this.detectionService.detectDisease(file).subscribe({
      next: (detection) => {
        this.detection.set(detection);

        // Étape 2 : segmentation U-Net → retourne PNG
        this.detectionService.segmentDisease(file).subscribe({
          next: ({ url, blob }) => {
            this.maskUrl.set(url);
            this.maskBlob = blob;
            this.loading.set(false);
            this.analyzed.set(true);
          },
          error: (err) => {
            this.error.set('Erreur service segmentation : ' + (err.error?.detail || err.message));
            this.loading.set(false);
          }
        });
      },
      error: (err) => {
        this.error.set('Erreur service détection : ' + (err.error?.detail || err.message));
        this.loading.set(false);
      }
    });
  }

  toggleMask(): void { this.showMask.update(v => !v); }

  onOpacityChange(event: Event): void {
    this.maskOpacity.set(+(event.target as HTMLInputElement).value);
  }

  reset(): void {
    this.previewUrl.set(null);
    this.maskUrl.set(null);
    this.maskBlob = null;
    this.selectedFile.set(null);
    this.detection.set(null);
    this.analyzed.set(false);
    this.error.set(null);
  }

  getConfidenceColor(): string {
    const c = this.detection()?.prediction.confidence ?? 0;
    if (c >= 0.75) return '#22c55e';
    if (c >= 0.5)  return '#f59e0b';
    return '#ef4444';
  }

  downloadMask(): void {
    if (!this.maskBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(this.maskBlob);
    a.download = 'masque_segmentation.png';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
