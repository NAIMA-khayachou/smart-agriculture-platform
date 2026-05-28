import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PredictionResult {
  prediction : string;
  detail     : string;
  confiance  : string;
  plante     : string;
  class_id   : string;
  statut     : 'saine' | 'malade';
  maladie    : string | null;
}
export interface PredictResponse {
  message     : string;
  analysis_id : number;
  result      : PredictionResult;  // ← wrappé ici
}

@Injectable({ providedIn: 'root' })
export class DiseaseService {

  private apiUrl = 'http://localhost:8000/api/v1/predict';

  constructor(private http: HttpClient) {}

  predict(file: File): Observable<PredictResponse> {  // ← PredictResponse
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post<PredictResponse>(this.apiUrl, formData, { headers });
}
}