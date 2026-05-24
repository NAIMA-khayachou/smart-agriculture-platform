
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login implements OnInit {

 
 
  loginForm!: FormGroup;
  activeTab: 'admin' | 'agriculture' = 'admin';
  showPassword = false;
  isLoading = false;
  loginError = '';
 
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
 
  setTab(tab: 'admin' | 'agriculture'): void {
    this.activeTab = tab;
    this.loginForm.reset();
    this.loginError = '';
  }
 
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
 
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
 
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
 
    this.isLoading = true;
    this.loginError = '';
 
    setTimeout(() => {
      this.isLoading = false;
      if (this.activeTab === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/agriculture/dashboard']);
      }
    }, 1500);
  }
}
  