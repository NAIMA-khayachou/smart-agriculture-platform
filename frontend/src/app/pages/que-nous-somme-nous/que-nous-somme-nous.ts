import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar';
@Component({
  selector: 'about-as',
  imports: [CommonModule, MatCardModule, MatIconModule,RouterOutlet,NavBarComponent], 
  templateUrl: './que-nous-somme-nous.html',
  styleUrl: './que-nous-somme-nous.css',
})
export class QueNousSommeNous {}
