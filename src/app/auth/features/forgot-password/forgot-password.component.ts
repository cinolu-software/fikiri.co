import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ForgotPasswordStore } from '../../data-access/forgot-password.store';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  providers: [ForgotPasswordStore],
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputText, RouterModule, CommonModule, AuthCardComponent],
})
export class AuthForgotPasswordComponent {
  #formBuilder = inject(FormBuilder);
  form: FormGroup;
  store = inject(ForgotPasswordStore);

  constructor() {
    this.form = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onForgotPassword(): void {
    if (!this.form.invalid) {
      this.form.disable();
      this.store.forgotPassword(this.form.value);
      this.form.enable();
    }
  }
}
