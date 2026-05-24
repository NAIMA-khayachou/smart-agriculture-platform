import { Injectable } from "@angular/core";
import {HttpClient}  from '@angular/common/http';
import { Construction } from "lucide-angular";
import { Observable } from "rxjs";

@Injectable({
     providedIn: 'root',
})
export class segementation_service {
    private segmentUrl = 'http://127.0.0.1:8081/segementation/mask';

    constructor(private http: HttpClient){}
     // Méthode pour envoyer l'image brute au modèle ResNet
      predictDisease(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file); // 'image' doit correspondre au nom attendu par ton backend
    
        return this.http.post<any>(this.segmentUrl, formData);
      }

}