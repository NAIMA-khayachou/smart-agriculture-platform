import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  localisation: string;
  telephone: string;
  surface: number;
}

export interface LoginData {
  username: string; // FastAPI OAuth2 attend "username"
  password: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  // ── Inscription ──────────────────────────────
  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // ── Connexion ────────────────────────────────
  login(data: LoginData): Observable<AuthToken> {
    // FastAPI /token attend du form-data, pas du JSON
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    return this.http.post<AuthToken>(`${this.apiUrl}/token`, formData);
  }

  // ── Token ────────────────────────────────────
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}