import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {RouterOutlet} from '@angular/router'; 
import {ResumeGlobalComponent} from '../resume-global/resume-global';
import  {RouterLink}  from '@angular/router';
@Component({
  selector: 'app-sidebar-agriculteur',
  standalone:true,
  imports: [MatIconModule,MatSidenavModule,MatListModule,RouterOutlet,RouterLink,ResumeGlobalComponent],
  templateUrl: './sidebar-agriculteur.html',
  styleUrl: './sidebar-agriculteur.css',
})
export class SidebarAgriculteur {

   menuOpened: boolean=false;
  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}
