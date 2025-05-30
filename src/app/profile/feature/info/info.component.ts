import { CommonModule } from '@angular/common';
import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, Subject, takeUntil } from 'rxjs';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FileUploadComponent } from '../../../shared/ui/file-upload/file-upload.component';
import { ProfileService } from '../../data-access/profile.service';
import { IUser } from '../../../shared/utils/types/models.type';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../auth/data-access/auth.service';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';

@Component({
  selector: 'app-profile-info',
  templateUrl: './info.component.html',
  providers: [ProfileService],
  imports: [ButtonModule, InputTextModule, CommonModule, ReactiveFormsModule, FileUploadComponent],
})
export class ProfileInfoComponent implements OnDestroy, OnInit {
  user = input<IUser>();
  infoForm: FormGroup;
  passwordForm: FormGroup;
  updateInfo$: Observable<IAPIResponse<IUser>> | undefined;
  updatePassword$: Observable<IAPIResponse<IUser>> | undefined;
  url = environment.apiUrl + 'users/image-profile';
  #formBuilder = inject(FormBuilder);
  #profileService = inject(ProfileService);
  #authService = inject(AuthService);
  #unSubscribe = new Subject();

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
      email: this.user()?.email,
      address: this.user()?.address,
      phone_number: this.user()?.phone_number,
      name: this.user()?.name,
    });
  }

  handleLoaded(): void {
    this.#authService.getProfile().pipe(takeUntil(this.#unSubscribe)).subscribe();
  }

  onUpdateInfo(): void {
    if (!this.infoForm.valid) return;
    this.updateInfo$ = this.#profileService.updateProfile(this.infoForm.value);
  }

  onUpdatePassword(): void {
    if (!this.passwordForm.valid) return;
    this.updatePassword$ = this.#profileService.updatePassword(this.passwordForm.value);
  }

  ngOnDestroy(): void {
    this.#unSubscribe.next(null);
    this.#unSubscribe.complete();
  }
}
