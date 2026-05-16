import { Component, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectionService, DetectionResult, SegmentationResult, Zone } from '../../services/detection.service';

@Component({
  selector: 'app-page-segementation',
  imports: [CommonModule],
  templateUrl: './page-segementation.html',
  styleUrl: './page-segementation.css',
})
export class PageSegementation {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('imgEl') imgRef!: ElementRef<HTMLImageElement>;

  previewUrl      = signal<string | null>(null);
  maskUrl         = signal<string | null>(null);
  private maskBlob: Blob | null = null;
  selectedFile    = signal<File | null>(null);
  detection       = signal<DetectionResult | null>(null);
  segmentation    = signal<SegmentationResult | null>(null);
  loading         = signal(false);
  analyzed        = signal(false);
  error           = signal<string | null>(null);
  showZones       = signal(true);
  maskOpacity     = signal(0.8);

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
    this.segmentation.set(null);
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

    // Étape 1 : détection ResNet50
    this.detectionService.detectDisease(file).subscribe({
      next: (detection) => {
        this.detection.set(detection);

        // Étape 2 : segmentation U-Net
        this.detectionService.segmentDisease(file).subscribe({
          next: (result) => {
            this.maskUrl.set(result.url);
            this.maskBlob = result.blob;
            this.segmentation.set(result);
            this.loading.set(false);
            this.analyzed.set(true);
            setTimeout(() => this.drawZones(), 200);
          },
          error: (err) => {
            this.error.set('Erreur segmentation : ' + (err.error?.detail || err.message));
            this.loading.set(false);
          }
        });
      },
      error: (err) => {
        this.error.set('Erreur détection : ' + (err.error?.detail || err.message));
        this.loading.set(false);
      }
    });
  }

  // Dessine les bounding boxes des zones infectées sur le canvas avec validation
  drawZones(): void {
    const canvas = this.canvasRef?.nativeElement;
    const img = this.imgRef?.nativeElement;
    if (!canvas || !img) return;

    // Dimensions d'affichage (CSS pixels)
    const displayW = img.clientWidth;
    const displayH = img.clientHeight;

    // Support pour écrans à haute densité
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(displayW * dpr);
    canvas.height = Math.round(displayH * dpr);
    canvas.style.width = displayW + 'px';
    canvas.style.height = displayH + 'px';

    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, displayW, displayH);

    if (!this.showZones()) return;

    const zones = this.segmentation()?.zones ?? [];
    // Calculer la zone occupée par l'image à l'intérieur du conteneur
    const naturalW = img.naturalWidth || displayW;
    const naturalH = img.naturalHeight || displayH;
    const scale = Math.min(displayW / naturalW, displayH / naturalH);
    const imgW = naturalW * scale;
    const imgH = naturalH * scale;
    const offsetX = (displayW - imgW) / 2;
    const offsetY = (displayH - imgH) / 2;
    const colors = ['#ef4444', '#f97316', '#eab308', '#8b5cf6', '#06b6d4'];

    zones.forEach((zone, i) => {
      const color = colors[i % colors.length];
      // Convertir coordonnées normalisées en coordonnées d'affichage
      const x = zone.x * imgW + offsetX;
      const y = zone.y * imgH + offsetY;
      const w = zone.width * imgW;
      const h = zone.height * imgH;

      // Validation visuelle : vérifier si la zone est significative
      const isSignificant = zone.area_percentage > 1.0; // Au moins 1% de l'image
      const opacity = isSignificant ? '40' : '15'; // Opacité différente
      const lineWidth = isSignificant ? 3 : 1;

      // Rectangle semi-transparent avec opacité variable
      ctx.fillStyle = color + opacity;
      ctx.fillRect(x, y, w, h);

      // Bordure avec épaisseur variable
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(x, y, w, h);

      // Style de bordure pour zones douteuses
      if (!isSignificant) {
        ctx.setLineDash([5, 5]); // Ligne pointillée pour zones douteuses
        ctx.strokeRect(x, y, w, h);
        ctx.setLineDash([]); // Reset
      }

      // Label avec indicateur de confiance
      const confidence = isSignificant ? '✓' : '?';
      const label = `${confidence} Zone ${zone.id} — ${zone.area_percentage}%`;
      
      ctx.font = 'bold 11px Inter, sans-serif';
      const labelWidth = ctx.measureText(label).width + 10;
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y - 22, labelWidth, 22);
      ctx.fillStyle = 'white';
      ctx.fillText(label, x + 5, y - 6);
    });

    // Ajouter une légende
    this.drawLegend(ctx, canvas.width, canvas.height);
  }

  // Ajouter une légende pour expliquer les symboles
  private drawLegend(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const legendY = height - 60;
    
    // Fond de la légende
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, legendY, 200, 50);
    
    // Texte de la légende
    ctx.fillStyle = 'white';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('✓ Zone confirmée (>1%)', 15, legendY + 15);
    ctx.fillText('? Zone douteuse (<1%)', 15, legendY + 30);
    ctx.fillText('--- Bordure pointillée = incertain', 15, legendY + 45);
  }

  toggleZones(): void {
    this.showZones.update(v => !v);
    setTimeout(() => this.drawZones(), 50);
  }

  onOpacityChange(event: Event): void {
    this.maskOpacity.set(+(event.target as HTMLInputElement).value);
  }

  reset(): void {
    this.previewUrl.set(null);
    this.maskUrl.set(null);
    this.maskBlob = null;
    this.selectedFile.set(null);
    this.detection.set(null);
    this.segmentation.set(null);
    this.analyzed.set(false);
    this.error.set(null);
  }

  getConfidenceColor(): string {
    const c = this.detection()?.prediction.confidence ?? 0;
    if (c >= 0.75) return '#22c55e';
    if (c >= 0.5)  return '#f59e0b';
    return '#ef4444';
  }

  getInfectionColor(): string {
    const p = this.segmentation()?.infection_percentage ?? 0;
    if (p <= 20) return '#22c55e';
    if (p <= 50) return '#f59e0b';
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
