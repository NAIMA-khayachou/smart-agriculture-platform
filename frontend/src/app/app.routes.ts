import { Routes } from '@angular/router';
import { PlantUploadComponent } from './plant-upload/plant-upload.component';

export const routes: Routes = [
  { path: '', redirectTo: 'analyse', pathMatch: 'full' },
  { path: 'analyse', component: PlantUploadComponent },
];