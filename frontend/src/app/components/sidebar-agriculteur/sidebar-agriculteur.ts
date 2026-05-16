import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {RouterOutlet} from '@angular/router'; 
 
@Component({
  selector: 'app-sidebar-agriculteur',
  imports: [MatIconModule,MatSidenavModule,MatListModule,RouterOutlet],
  templateUrl: './sidebar-agriculteur.html',
  styleUrl: './sidebar-agriculteur.css',
})
export class SidebarAgriculteur {

   menuOpened: boolean=false;
  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}
