import { Routes } from '@angular/router';
import { DetectionComponent } from './components/detection/detection.component';
import { PageSegementation } from './components/page-segementation/page-segementation';

export const routes: Routes = [
  { path: '', component: DetectionComponent },
  { path: 'segmentation', component: PageSegementation }
];
