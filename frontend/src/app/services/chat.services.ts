import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private apiUrl = 'http://127.0.0.1:8001/api/v1';

  constructor(private http: HttpClient) {}

  chat(sessionId: string, question: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat`, {
      session_id: sessionId,
      question  : question
    });
  }
}