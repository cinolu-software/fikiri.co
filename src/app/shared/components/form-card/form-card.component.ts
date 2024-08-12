import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-card',
  standalone: true,
  templateUrl: './form-card.component.html',
  imports: [CommonModule]
})
export class FormCardComponent {
  formTitle = input.required<string>();
}
