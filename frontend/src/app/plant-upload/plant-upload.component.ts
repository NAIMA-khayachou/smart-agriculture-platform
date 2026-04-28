import { Component, ElementRef, ViewChild, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantService, PlantAnalysisResult } from './plant-service.component';

type Status = 'idle' | 'uploading' | 'analyzing' | 'done' | 'error';

@Component({
  selector: 'app-plant-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-upload.component.html',
  styleUrls: ['./plant-upload.component.css']
})
export class PlantUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private plantService = inject(PlantService);

  isDragging = signal(false);
  previewUrl = signal<string | null>(null);
  selectedFile = signal<File | null>(null);
  status = signal<Status>('idle');
  progress = signal(0);
  result = signal<PlantAnalysisResult | null>(null);
  errorMessage = signal<string>('');

  onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging.set(true); }
  onDragLeave() { this.isDragging.set(false); }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(false);
    const f = e.dataTransfer?.files[0];
    if (f?.type.startsWith('image/')) this.loadFile(f);
  }

  onFileSelected(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.loadFile(f);
  }

  loadFile(f: File) {
    this.selectedFile.set(f);
    this.result.set(null);
    this.status.set('idle');
    this.progress.set(0);
    this.errorMessage.set('');
    const r = new FileReader();
    r.onload = (ev) => this.previewUrl.set(ev.target?.result as string);
    r.readAsDataURL(f);
  }

  triggerInput() { this.fileInput.nativeElement.click(); }

  reset() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.status.set('idle');
    this.progress.set(0);
    this.result.set(null);
    this.errorMessage.set('');
    this.fileInput.nativeElement.value = '';
  }

  analyze() {
    const file = this.selectedFile();
    if (!file) return;

    this.status.set('uploading');
    this.progress.set(0);
    this.errorMessage.set('');

    // Simulation progression upload
    const iv = setInterval(() => {
      this.progress.update(v => {
        if (v >= 90) {
          clearInterval(iv);
          this.status.set('analyzing');
          return 90;
        }
        return v + 10;
      });
    }, 120);

    // Appel réel vers ton backend ResNet
    this.plantService.analyzeImage(file).subscribe({
      next: (data: PlantAnalysisResult) => {
        clearInterval(iv);
        this.progress.set(100);
        this.result.set(data);
        this.status.set('done');
      },
      error: (err: any) => {
        clearInterval(iv);
        this.errorMessage.set(
          err?.status === 0
            ? 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.'
            : err?.error?.detail ?? 'Erreur lors de l\'analyse.'
        );
        this.status.set('error');
      }
    });
  }

  healthColor(): string {
    const h = this.result()?.health ?? 0;
    return h >= 75 ? '#4ade80' : h >= 50 ? '#facc15' : '#f87171';
  }
}