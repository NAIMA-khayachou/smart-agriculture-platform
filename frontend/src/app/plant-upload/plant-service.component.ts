import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PlantAnalysisResult {
  plant: string;
  health: number;
  disease: string;
  treatment: string;
  confidence: number;
  severity?: string;
  additional_diseases?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private apiUrl = environment.apiUrl; // ex: http://localhost:8000

  constructor(private http: HttpClient) {}

  analyzeImage(file: File): Observable<PlantAnalysisResult> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<PlantAnalysisResult>(
      `${this.apiUrl}/api/analyze`,
      formData
    );
  }
}