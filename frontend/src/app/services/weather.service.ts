// src/app/services/weather.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '65dec9e101969e942885e9073e701288'; 
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=fr`);
  }

  getWeatherByCity(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`);
  }
}