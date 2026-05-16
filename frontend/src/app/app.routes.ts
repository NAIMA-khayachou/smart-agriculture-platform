import { Routes } from '@angular/router';
import { DetectionComponent } from './plant-upload/plant-upload.component';
import { PageSegementation } from './pages/page-segementation/page-segementation';
import {TraitementComponent} from './pages/traitement/traitement.component';
import { ChatComponent }       from './chat/chat.component';
import { TreatmentDetailsComponent } from './pages/traitement/traitement-details/treatment-details.component';
import { HomeComponent } from './pages/home/home';
import {QueNousSommeNous} from './pages/que-nous-somme-nous/que-nous-somme-nous';
import {DashboardAgriculteur} from './pages/dashboard-agriculteur/dashboard-agriculteur';
export const routes: Routes = [
  { path: '', redirectTo: 'detection', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path:'about' ,component: QueNousSommeNous},
  {path:'agriculteur' ,component:DashboardAgriculteur},
  { path: 'detection', component: DetectionComponent },
  { path: 'segmentation', component: PageSegementation },
  {path:'Traitement',component:TraitementComponent},
  {path: 'chat', component: ChatComponent },
  {path: 'details',component: TreatmentDetailsComponent },
];
 
