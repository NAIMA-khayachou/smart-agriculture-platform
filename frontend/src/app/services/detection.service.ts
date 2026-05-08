import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DetectionResult {
  success: boolean;
  filename: string;
  prediction: {
    class_id: number;
    class_name: string;
    confidence: number;
  };
}

export interface Zone {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  area_pixels: number;
  area_percentage: number;
}

export interface SegmentationResult {
  url: string;
  blob: Blob;
  infected_pixels: number;
  infection_percentage: number;
  zones: Zone[];
}

@Injectable({ providedIn: 'root' })
export class DetectionService {
  private apiUrl     = 'http://localhost:8081/api/v1';
  private segmentUrl = 'http://127.0.0.1:8000/segementation/mask';

  constructor(private http: HttpClient) {}

  detectDisease(file: File): Observable<DetectionResult> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<DetectionResult>(`${this.apiUrl}/detect`, formData);
  }

  segmentDisease(file: File): Observable<SegmentationResult> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{
      mask: string;
      success: boolean;
      infected_pixels: number;
      infection_percentage: number;
      zones: Zone[];
    }>(this.segmentUrl, formData).pipe(
      map(response => {
        const byteChars = atob(response.mask);
        const byteArr = new Uint8Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteArr[i] = byteChars.charCodeAt(i);
        }
        const blob = new Blob([byteArr], { type: 'image/png' });
        return {
          url: URL.createObjectURL(blob),
          blob,
          infected_pixels: response.infected_pixels,
          infection_percentage: response.infection_percentage,
          zones: response.zones
        };
      })
    );
  }
}
