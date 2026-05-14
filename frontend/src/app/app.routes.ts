import { Routes } from '@angular/router';


import { DetectionComponent } from './plant-upload/plant-upload.component';
import { PageSegementation } from './components/page-segementation/page-segementation';

import {TraitementComponent} from './traitement/traitement.component';
import { ChatComponent }       from './chat/chat.component';
import { TreatmentDetailsComponent } from './traitement/treatment-details.component';
export const routes: Routes = [
  { path: '', redirectTo: 'detection', pathMatch: 'full' },
  { path: 'detection', component: DetectionComponent },
  { path: 'segmentation', component: PageSegementation },
  {path:'Traitement',component:TraitementComponent},
  {path: 'chat', component: ChatComponent },
  {path: 'details',component: TreatmentDetailsComponent },
];
 
