import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadComponent } from '../../../shared/ui/file-upload/file-upload.component';
import { IUser } from '../../../shared/utils/types/models.type';
import { environment } from '../../../../environments/environment.development';
import { AuthStore } from '../../../shared/store/auth.store';
import { UpdateInfoStore } from '../../data-access/update-info.store';
import { UpdatePasswordStore } from '../../data-access/update-password.store';

@Component({
  selector: 'app-profile-info',
  templateUrl: './info.component.html',
  providers: [UpdateInfoStore, UpdatePasswordStore],
  imports: [ButtonModule, InputTextModule, CommonModule, ReactiveFormsModule, FileUploadComponent],
})
export class ProfileInfoComponent implements OnInit {
  user = input<IUser>();
  infoForm: FormGroup;
  passwordForm: FormGroup;
  url = environment.apiUrl + 'users/image-profile';
  #formBuilder = inject(FormBuilder);
  authStore = inject(AuthStore);
  updateInfoStore = inject(UpdateInfoStore);
  updatePasswordStore = inject(UpdatePasswordStore);

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
