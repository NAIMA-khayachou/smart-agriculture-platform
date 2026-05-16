import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectionService, DetectionResult } from '../../services/detection.service';

@Component({
  selector: 'app-detection',
  imports: [CommonModule],
  templateUrl: './detection.component.html',
  styleUrl: './detection.component.css'
})
export class DetectionComponent {
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  result = signal<DetectionResult | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private detectionService: DetectionService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFile.set(file);
    this.result.set(null);
    this.error.set(null);

    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    this.selectedFile.set(file);
    this.result.set(null);
    this.error.set(null);

    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  analyze(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.loading.set(true);
    this.error.set(null);
    this.result.set(null);

    this.detectionService.detectDisease(file).subscribe({
      next: (res) => {
        this.result.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.detail || 'Erreur de connexion au serveur.');
        this.loading.set(false);
      }
    });
  }

  reset(): void {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.result.set(null);
    this.error.set(null);
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 0.75) return '#22c55e';
    if (confidence >= 0.5) return '#f59e0b';
    return '#ef4444';
  }

  isHealthy(className: string): boolean {
    return className.toLowerCase().includes('leaf') &&
      !className.toLowerCase().includes('blight') &&
      !className.toLowerCase().includes('spot') &&
      !className.toLowerCase().includes('rust') &&
      !className.toLowerCase().includes('scab') &&
      !className.toLowerCase().includes('mold') &&
      !className.toLowerCase().includes('virus') &&
      !className.toLowerCase().includes('mites') &&
      !className.toLowerCase().includes('mildew');
  }
}
