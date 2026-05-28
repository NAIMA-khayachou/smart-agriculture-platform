import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  private authHeaders() {
    const token = localStorage.getItem('access_token'); // ← 'access_token' pas 'token'
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  getStats() {
    return this.http.get(`${this.apiUrl}/stats`, this.authHeaders());
  }

  getAnalyses() {
    return this.http.get(`${this.apiUrl}/analyses`, this.authHeaders());
  }
}