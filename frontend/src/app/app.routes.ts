import { Routes } from '@angular/router';
import { DetectionComponent } from './plant-upload/plant-upload.component';

export const routes: Routes = [
  { path: '', redirectTo: 'detection', pathMatch: 'full' },
  { path: 'detection', component: DetectionComponent },
];