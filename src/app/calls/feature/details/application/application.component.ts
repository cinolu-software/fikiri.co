import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CallsService } from '../../../data-access/calls.service';
import { IAPIResponse } from '../../../../shared/services/api/types/api-response.type';
import { Field, IApplication } from '../../../../shared/utils/types/models.type';

@Component({
  selector: 'app-application-form',
  providers: [CallsService],
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, TextareaModule, ButtonModule, SelectModule],
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit {
  application$: Observable<IAPIResponse<IApplication>> | undefined;
  fields = input<Field[]>();
  call = input<string>();
  form: FormGroup = new FormGroup({});
  #callsService = inject(CallsService);

  buildForm(): void {
    const group: { [key: string]: unknown } = {};
    this.fields()?.forEach((field) => {
      group[field.label] = new FormControl('', field.required ? { nonNullable: true } : {});
    });
    this.form = new FormGroup(group as unknown as FormControl[]);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  submitForm(): void {
    if (!this.form || this.form.invalid) return;
    this.application$ = this.#callsService.apply(this.call(), this.form.value);
  }
}
