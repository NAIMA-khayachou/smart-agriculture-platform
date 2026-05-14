import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TreatmentService } from '../services/treatment.service';
import { LucideAngularModule, ClipboardList, MessageCircle } from 'lucide-angular';
@Component({
  selector: 'app-traitement',
  standalone: true,
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {
   readonly ClipboardList  = ClipboardList;   // icône détails
   readonly MessageCircle  = MessageCircle;   
  classId  = signal<string>('');
  response = signal<string>('');
  loading  = signal<boolean>(true);
  error    = signal<string>('');

  constructor(
    private route  : ActivatedRoute,
    private router : Router,
    private service: TreatmentService
  ) {}

  ngOnInit() {
    // Récupérer le class_id depuis l'URL
    console.log('Tous les queryParams :', this.route.snapshot.queryParams);
    this.classId.set(this.route.snapshot.queryParams['class_id'] ?? '');
    console.log('class_id :', this.classId());

    // Appeler l'API FastAPI
    this.service.getTreatment(this.classId()).subscribe({
      next : (data) => {
        this.response.set(data.response);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors de la récupération du traitement.');
        this.loading.set(false);
      }
    });
  }

  goToDetails() {
    this.router.navigate(['/details'], {
      queryParams: { class_id: this.classId() }
    });
  }

 goToChat() {
  this.router.navigate(['/chat'], {
    queryParams: { class_id: this.classId() }
  });
}

}