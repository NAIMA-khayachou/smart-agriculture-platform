import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TreatmentService } from '../services/treatment.service';
import { LucideAngularModule, ArrowLeft, Leaf, Bug, FlaskConical, Sprout, Shield } from 'lucide-angular';

@Component({
  selector   : 'app-treatment-details',
  standalone : true,
  imports    : [CommonModule, LucideAngularModule],
  templateUrl: './treatment-details.component.html',
  styleUrls  : ['./treatment-details.component.css']
})
export class TreatmentDetailsComponent implements OnInit {

  readonly ArrowLeft    = ArrowLeft;
  readonly Leaf         = Leaf;
  readonly Bug          = Bug;
  readonly FlaskConical = FlaskConical;
  readonly Sprout       = Sprout;
  readonly Shield       = Shield;

  classId  = signal<string>('');
  details  = signal<any>(null);
  loading  = signal<boolean>(true);
  error    = signal<string>('');

  constructor(
    private route  : ActivatedRoute,
    private router : Router,
    private service: TreatmentService
  ) {}

  ngOnInit() {
  this.classId.set(this.route.snapshot.queryParams['class_id'] ?? '');

  this.service.getDetails(this.classId()).subscribe({
    next: (data) => {
      this.details.set(data.response);  // string directement
      this.loading.set(false);
    },
    error: () => {
      this.error.set('Erreur lors de la récupération des détails.');
      this.loading.set(false);
    }
  });
}
  goBack() {
    this.router.navigate(['/Traitement'], {
      queryParams: { class_id: this.classId() }
    });
  }
}