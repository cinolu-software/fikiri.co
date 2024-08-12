import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUpdatePasswordStore } from './types/update-password-store.interface';
import { UpdatePasswordStore } from './data-access/update-password.store';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../../shared/ui/input/input.component';

@Component({
  selector: 'app-update-password',
  standalone: true,
  providers: [UpdatePasswordStore],
  templateUrl: './update-password.component.html',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, ButtonComponent]
})
export class UpdatePasswordComponent {
  form: FormGroup;
  vm$: Observable<IUpdatePasswordStore>;

  constructor(private store: UpdatePasswordStore, private formBuilder: FormBuilder) {
    this.vm$ = this.store.vm$;
    this.form = this.formBuilder.nonNullable.group({
      old_password: [''],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  onSumbit(): void {
    this.store.updatePassword(this.form.value);
  }
}
