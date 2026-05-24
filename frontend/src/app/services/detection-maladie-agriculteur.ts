import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  // L'URL de ton API Python (FastAPI / Flask / Django)
  private apiUrl = 'http://localhost:8000/predict'; 

  constructor(private http: HttpClient) { }

  // Méthode pour envoyer l'image brute au modèle ResNet
  predictDisease(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // 'image' doit correspondre au nom attendu par ton backend

    return this.http.post<any>(this.apiUrl, formData);
  }
}