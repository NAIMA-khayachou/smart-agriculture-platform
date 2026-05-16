import { Component } from '@angular/core';
import {SidebarAgriculteur} from '../../components/sidebar-agriculteur/sidebar-agriculteur';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard-agriculteur',
  imports: [SidebarAgriculteur,RouterOutlet],
  templateUrl: './dashboard-agriculteur.html',
  styleUrl: './dashboard-agriculteur.css',
})
export class DashboardAgriculteur {}
