
import { Routes } from '@angular/router';
import { DetectionComponent } from './plant-upload/plant-upload.component';
<<<<<<< HEAD
import { PageSegementation } from './pages/page-segementation/page-segementation';
import { TraitementComponent } from './pages/traitement/traitement.component';
import { ChatComponent } from './chat/chat.component';
import { TreatmentDetailsComponent } from './pages/traitement/traitement-details/treatment-details.component';
import { HomeComponent } from './pages/home/home';
import { QueNousSommeNous } from './pages/que-nous-somme-nous/que-nous-somme-nous';
import { DashboardAgriculteur } from './pages/dashboard-agriculteur/dashboard-agriculteur';
import { ResumeGlobalComponent } from './components/resume-global/resume-global';
import {DetectionAgriculteurComponent} from './components/section-detection-mlade-rest/section-detection-mlade-rest';
import { Login } from './pages/login/login';
import { YieldPredictionComponent } from './yield-prediction/yield-prediction.component';
import {Register} from './pages/register/register';


export const routes: Routes = [
  // 1. Pages publiques (Hors Dashboard, pleine page)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent ,},
  { path: 'about', component: QueNousSommeNous },
  { path: 'segmentation', component: PageSegementation },
  {path:'Admin' , component:Login},
  {path: 'Register', component: Register},
  {path: 'yield', component: YieldPredictionComponent },


  // 2. Le Dashboard Parent (Contient la Sidebar fixe et le <router-outlet>)
  {
    path: 'agriculteur',
    component: DashboardAgriculteur,
    children: [
      // Par défaut, quand on va sur /agriculteur, on affiche le résumé global
      { path: '', redirectTo: 'resume-global', pathMatch: 'full' },

      // Toutes ces pages s'ouvriront AU MILIEU du Dashboard, sans recharger la sidebar
      { path: 'resume-global', component: ResumeGlobalComponent },
      { path: 'detect', component: DetectionComponent },
      { path: 'segmentation', component: PageSegementation },
      { path: 'traitement', component: TraitementComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'details', component: TreatmentDetailsComponent },
    ]
  },
  
  // Redirection de sécurité au cas où l'ancienne route est appelée directement
  { path: 'resume-global', redirectTo: 'agriculteur/resume-global', pathMatch: 'full' }
];

