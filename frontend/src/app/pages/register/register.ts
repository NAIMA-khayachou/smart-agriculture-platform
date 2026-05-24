import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  inscriptionForm!: FormGroup;
  showPassword = false;
  submitted = false;

  private readonly FIELDS = ['nom','prenom','email','password','region','telephone','surface'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inscriptionForm = this.fb.group({
      nom:       ['', Validators.required],
      prenom:    ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(8)]],
      region:    ['', Validators.required],
      telephone: ['', Validators.required],
      surface:   ['', [Validators.required, Validators.min(0)]]
    });
  }

  get progressPercent(): number {
    const filled = this.FIELDS.filter(key => {
      const val = this.inscriptionForm.get(key)?.value;
      return val !== null && val !== '' && val !== undefined;
    }).length;
    return Math.round((filled / this.FIELDS.length) * 100);
  }

  isInvalid(field: string): boolean {
    const control = this.inscriptionForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
      return;
    }

    this.submitted = true;
    const v = this.inscriptionForm.value;

    this.authService.register({
      nom:          v.nom,
      prenom:       v.prenom,
      email:        v.email,
      password:     v.password,
      localisation: v.region,
      telephone:    v.telephone,
      surface:      v.surface
    }).subscribe({
      next: () => {
        // ✔️ Inscription réussie → redirection vers connexion
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur inscription:', err);
        this.submitted = false;
        alert(err.error?.detail || 'Une erreur est survenue.');
      }
    });
  }
}