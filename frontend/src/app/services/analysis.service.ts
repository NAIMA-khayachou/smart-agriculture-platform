import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  getStats(token: string) {
    return this.http.get(`${this.apiUrl}/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAnalyses(token: string) {
    return this.http.get(`${this.apiUrl}/analyses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}