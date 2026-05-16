import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-card-plante',
  imports: [MatCardModule,MatButton,RouterLink],
  templateUrl: './card-plante.html',
  styleUrl: './card-plante.css'
})
export class CardPlanteComponent {

}
