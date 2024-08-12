import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button-outline',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button-outline.component.html'
})
export class ButtonOutlineComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  loading = input<boolean>(false);
}
