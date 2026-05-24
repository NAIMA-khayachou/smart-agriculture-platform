import { Component, OnInit, signal, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YieldService, PredictionRequest, PredictionResponse } from '../services/yield.service';

@Component({
  selector: 'app-yield-prediction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './yield-prediction.component.html',
  styleUrls: ['./yield-prediction.component.css']
})
export class YieldPredictionComponent implements OnInit, OnChanges {

  // ← Si le composant reçoit le résultat de détection depuis le parent
  @Input() detectionResult: string = '';

  crops         = signal<string[]>([]);
  regions       = signal<string[]>([]);
  soilTypes     = signal<string[]>([]);
  weatherConds  = signal<string[]>([]);
  loadingInfo   = signal(true);
  loading       = signal(false);
  error         = signal('');
  result        = signal<PredictionResponse | null>(null);

  // Message indiquant que la culture a été auto-remplie
  detectedCrop  = signal('');

  formData: PredictionRequest = {
    Region: '',
    Soil_Type: '',
    Crop: '',
    Rainfall_mm: 150,
    Temperature_Celsius: 22,
    Fertilizer_Used: false,
    Irrigation_Used: false,
    Weather_Condition: '',
    Days_to_Harvest: 90,
    Disease_Affected_Percentage: 0
  };

  constructor(private yieldService: YieldService) {}

  ngOnInit(): void {
    this.yieldService.getModelInfo().subscribe({
      next: (info) => {
        this.crops.set([...info.supported_crops]);
        this.regions.set([...info.supported_regions]);
        this.soilTypes.set([...info.supported_soil_types]);
        this.weatherConds.set([...info.supported_weather]);

        this.formData.Crop             = info.supported_crops[0];
        this.formData.Region           = info.supported_regions[0];
        this.formData.Soil_Type        = info.supported_soil_types[0];
        this.formData.Weather_Condition = info.supported_weather[0];

        this.loadingInfo.set(false);

        // Si un résultat de détection est déjà disponible au chargement
        if (this.detectionResult) {
          this.applyCropFromDetection(this.detectionResult);
        }
      },
      error: (err) => {
        console.error('❌ Erreur:', err);
        this.error.set('⚠️ Impossible de contacter le service de prédiction');
        this.loadingInfo.set(false);
      }
    });
  }

  // ← Appelé quand @Input() detectionResult change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detectionResult'] && this.detectionResult) {
      this.applyCropFromDetection(this.detectionResult);
    }
  }

  // ← Extrait "Tomato" depuis "Tomato__early_blight"
  applyCropFromDetection(detection: string): void {
    // "Tomato__early_blight" → "Tomato"
    const cropName = detection.split('__')[0];

    // Vérifier que la culture existe dans le modèle
    const availableCrops = this.crops();
    const matchedCrop = availableCrops.find(
      c => c.toLowerCase() === cropName.toLowerCase()
    );

    if (matchedCrop) {
      this.formData = { ...this.formData, Crop: matchedCrop };
      this.detectedCrop.set(`🌿 Culture détectée automatiquement : ${matchedCrop}`);
    } else {
      this.detectedCrop.set(`⚠️ Culture "${cropName}" non reconnue par le modèle`);
    }
  }

  onSubmit(): void {
    this.loading.set(true);
    this.error.set('');
    this.result.set(null);

    this.yieldService.predictYield(this.formData).subscribe({
      next: (response) => {
        this.result.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('⚠️ Erreur lors de la prédiction');
        this.loading.set(false);
      }
    });
  }

  getConfidenceColor(): string {
    const r = this.result();
    if (!r) return '';
    return r.confidence === 'high'   ? '#1D9E75' :
           r.confidence === 'medium' ? '#F59E0B' : '#EF4444';
  }
}