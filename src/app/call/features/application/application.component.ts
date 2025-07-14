import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Field } from '../../../shared/utils/types/models.type';
import { ApplicationStore } from '../../data-access/application.store';

@Component({
  selector: 'app-application-form',
  providers: [ApplicationStore],
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, TextareaModule, ButtonModule, SelectModule],
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit {
  fields = input<Field[]>();
  call = input.required<string>();
  form: FormGroup = new FormGroup({});
  store = inject(ApplicationStore);

  buildForm(): void {
    const group: Record<string, unknown> = {};
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
    this.store.apply({ responses: this.form.value, call: this.call() });
  }
}
