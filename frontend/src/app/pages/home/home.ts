import { Component } from '@angular/core';
import {NavBarComponent} from '../../components/nav-bar/nav-bar';
import {CardPlanteComponent} from '../../components/card-plante/card-plante';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink,NavBarComponent,CardPlanteComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
