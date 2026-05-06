 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PredictionRequest {
  Region: string;
  Soil_Type: string;
  Crop: string;
  Rainfall_mm: number;
  Temperature_Celsius: number;
  Fertilizer_Used: boolean;
  Irrigation_Used: boolean;
  Weather_Condition: string;
  Days_to_Harvest: number;
}

export interface PredictionResponse {
  predicted_yield: number;
  unit: string;
  crop: string;
  confidence: string;
  model_r2: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class YieldService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Récupère les valeurs valides depuis le modèle
  getModelInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/model/info`);
  }

  // Envoie les données et reçoit la prédiction
  predictYield(data: PredictionRequest): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(`${this.apiUrl}/predict`, data);
  }
}