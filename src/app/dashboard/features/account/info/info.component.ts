import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../../../environments/environment';
import { AuthStore } from '../../../../shared/store/auth.store';
import { FileUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';
import { IUser } from '../../../../shared/utils/types/models.type';
import { DashboardUpdateInfoStore } from '../../../data-access/account/update-info.store';
import { DashboardUpdatePasswordStore } from '../../../data-access/account/update-password.store';

@Component({
  selector: 'app-account-info',
  templateUrl: './info.component.html',
  providers: [DashboardUpdateInfoStore, DashboardUpdatePasswordStore],
  imports: [ButtonModule, InputTextModule, CommonModule, ReactiveFormsModule, FileUploadComponent],
})
export class AccountInfoComponent implements OnInit {
  user = input<IUser>();
  infoForm: FormGroup;
  passwordForm: FormGroup;
  url = environment.apiUrl + 'users/me/profile-image';
  #formBuilder = inject(FormBuilder);
  authStore = inject(AuthStore);
  updateInfoStore = inject(DashboardUpdateInfoStore);
  updatePasswordStore = inject(DashboardUpdatePasswordStore);

  constructor() {
    this.infoForm = this.#formBuilder.group({
      email: ['', Validators.email],
      address: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.minLength(10), Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      name: ['', Validators.minLength(3)],
    });
    this.passwordForm = this.#formBuilder.group({
      password: ['', [Validators.minLength(6), Validators.required]],
      password_confirm: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  ngOnInit(): void {
    this.infoForm.patchValue({
      email: this.authStore.user()?.email,
      address: this.authStore.user()?.address,
      phone_number: this.authStore.user()?.phone_number,
      name: this.authStore.user()?.name,
    });
  }

  handleLoaded(): void {
    this.authStore.getProfile();
  }

  onUpdateInfo(): void {
    if (!this.infoForm.valid) return;
    this.updateInfoStore.updateInfo(this.infoForm.value);
  }

  onUpdatePassword(): void {
    if (!this.passwordForm.valid) return;
    this.updatePasswordStore.updatePassword(this.passwordForm.value);
  }
}
