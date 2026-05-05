import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TreatmentService {
  private apiUrl = 'http://127.0.0.1:8001/api/v1';

  constructor(private http: HttpClient) {}

  getTreatment(classId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/treatment/${classId}`)
      .pipe(timeout(60000));  // attendre 60 secondes max (LLM est lent)
  }

  getDetails(classId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/treatment/${classId}/details`)
      .pipe(timeout(30000));
  }
}