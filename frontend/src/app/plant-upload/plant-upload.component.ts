import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Leaf,
  AlertTriangle,
  Upload,
  X,
  ScanLine,
  ShieldCheck,
  AlertCircle,
  RotateCcw
} from 'lucide-angular';
import { DiseaseService, PredictionResult } from './plant-service.component';

interface DisplayResult {
  plant     : string;
  disease   : string;
  confidence: number;
  health    : number;
}

@Component({
  selector   : 'app-detection',
  standalone : true,
  imports    : [CommonModule, LucideAngularModule],
  templateUrl: './plant-upload.component.html',
  styleUrls  : ['./plant-upload.component.css']
})
export class DetectionComponent {

  // ── Icônes Lucide ──────────────────────────────────
  readonly Leaf          = Leaf;
  readonly AlertTriangle = AlertTriangle;
  readonly Upload        = Upload;
  readonly X             = X;
  readonly ScanLine      = ScanLine;
  readonly ShieldCheck   = ShieldCheck;
  readonly AlertCircle   = AlertCircle;
  readonly RotateCcw     = RotateCcw;

  // ── Signals ────────────────────────────────────────
  isDragging   = signal(false);
  previewUrl   = signal<string | null>(null);
  selectedFile = signal<File | null>(null);
  status       = signal<'idle' | 'uploading' | 'analyzing' | 'done' | 'error'>('idle');
  progress     = signal(0);
  errorMessage = signal('');
  result       = signal<DisplayResult | null>(null);

  // ── Computed ───────────────────────────────────────
  healthColor = computed(() => {
    const h = this.result()?.health ?? 0;
    if (h >= 70) return '#22c55e';
    if (h >= 40) return '#f59e0b';
    return '#ef4444';
  });

  constructor(private diseaseService: DiseaseService) {}

  // ── Drag & Drop ────────────────────────────────────
  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave() {
    this.isDragging.set(false);
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(false);
    const file = e.dataTransfer?.files[0];
    if (file) this.loadFile(file);
  }

  triggerInput() {
    document.querySelector<HTMLInputElement>('input[type=file]')?.click();
  }

  onFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.loadFile(file);
  }

  loadFile(file: File) {
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
    this.status.set('idle');
    this.result.set(null);
  }

  reset() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.status.set('idle');
    this.result.set(null);
    this.progress.set(0);
    this.errorMessage.set('');
  }

  // ── Analyse ────────────────────────────────────────
  analyze() {
    const file = this.selectedFile();
    if (!file) return;

    this.status.set('uploading');
    this.progress.set(0);

    const interval = setInterval(() => {
      this.progress.update(p => {
        if (p >= 90) { clearInterval(interval); return 90; }
        return p + 10;
      });
    }, 100);

    this.diseaseService.predict(file).subscribe({
      next: (res: PredictionResult) => {
        clearInterval(interval);
        this.progress.set(100);
        this.status.set('analyzing');

        setTimeout(() => {
          this.result.set(this.mapResult(res));
          this.status.set('done');
        }, 1000);
      },
      error: (err) => {
        clearInterval(interval);
        this.status.set('error');
        this.errorMessage.set(
          err.error?.detail ?? 'Erreur lors de l\'analyse. Réessayez.'
        );
      }
    });
  }

  // ── Mapping ────────────────────────────────────────
  private mapResult(res: PredictionResult): DisplayResult {
    const confidence = parseFloat(res.confiance.replace('%', ''));
    const health     = res.statut === 'saine' ? confidence : 100 - confidence;

    return {
      plant     : res.plante,
      disease   : res.maladie ?? 'Aucune maladie détectée',
      confidence: Math.round(confidence),
      health    : Math.round(health),
    };
  }
}