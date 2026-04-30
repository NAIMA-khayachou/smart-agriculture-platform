import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PredictionResult {
  prediction : string;
  detail     : string;
  confiance  : string;
  plante     : string;
  statut     : 'saine' | 'malade';
  maladie    : string | null;
}

@Injectable({ providedIn: 'root' })
export class DiseaseService {

  private apiUrl = 'http://localhost:8000/api/v1/predict';

  constructor(private http: HttpClient) {}

  predict(file: File): Observable<PredictionResult> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<PredictionResult>(this.apiUrl, formData);
  }
}