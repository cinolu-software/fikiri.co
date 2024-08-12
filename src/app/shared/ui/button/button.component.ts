import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
}
