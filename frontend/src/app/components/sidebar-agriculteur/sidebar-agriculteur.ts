import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {RouterOutlet,RouterLink,RouterLinkActive} from '@angular/router'; 
import {ResumeGlobalComponent} from '../resume-global/resume-global';
import {DetectionAgriculteurComponent} from '../section-detection-mlade-rest/section-detection-mlade-rest';
  
import {LocalisationMaladieComponent} from '../segementation-service/segementation-service';
@Component({
  selector: 'app-sidebar-agriculteur',
  standalone:true,
  imports: [RouterLinkActive,
    MatIconModule,
    MatSidenavModule,MatListModule,
    RouterOutlet,RouterLink,
    ResumeGlobalComponent,
    DetectionAgriculteurComponent,
    LocalisationMaladieComponent
  ],
  templateUrl: './sidebar-agriculteur.html',
  styleUrl: './sidebar-agriculteur.css',
})
export class SidebarAgriculteur {

   menuOpened: boolean=false;
  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}
