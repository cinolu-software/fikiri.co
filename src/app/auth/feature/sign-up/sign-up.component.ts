import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../data-access/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IUser } from '../../../shared/utils/types/models.type';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthCardComponent,
  ],
})
export class AuthSignUpComponent implements OnInit {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #route = inject(ActivatedRoute);
  #link = signal<string>('');
  signUpForm: FormGroup;
  signIn$: Observable<IAPIResponse<IUser>> | undefined;

  constructor() {
    this.signUpForm = this.#formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.minLength(10), Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      name: ['', [Validators.minLength(3), Validators.required]],
    });
  }

  ngOnInit(): void {
    this.#link.set(this.#route.snapshot.queryParams?.['link']);
  }

  onSignUp(): void {
    if (this.signUpForm.invalid) return;
    this.signIn$ = this.#authService.signUp(this.signUpForm.value, this.#link());
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
