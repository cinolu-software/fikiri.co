import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { UpdateInfoStore } from './data-access/update-info.store';
import { IUpdateInfoStore } from './types/update-info-store.interface';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../../../shared/types/models.interfaces';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { InputComponent } from '../../../../../shared/ui/input/input.component';

@Component({
  selector: 'app-update-info',
  standalone: true,
  providers: [UpdateInfoStore],
  templateUrl: './update-info.component.html',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, ButtonComponent]
})
export class UpdateInfoComponent implements OnInit {
  form: FormGroup;
  vm$: Observable<{ udpateInfoState: IUpdateInfoStore; user: IUser | null }>;

  constructor(private store: UpdateInfoStore, private formBuilder: FormBuilder) {
    this.vm$ = this.store.vm$;
    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.vm$.pipe(takeUntil(this.store.destroy$)).subscribe((state) => {
      this.form.patchValue({
        name: state.user?.name,
        address: state.user?.address,
        phone_number: state.user?.phone_number
      });
    });
  }

  onSubmit(): void {
    this.store.upatedProfile(this.form.value);
  }
}
