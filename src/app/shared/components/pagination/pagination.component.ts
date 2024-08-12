import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  disablePrev = input<boolean>(false);
  disableNext = input(false);
  type = input<'default' | 'withLabel'>('default');
  handlePrevClick = output<void>();
  handleNexClick = output<void>();

  onPrevClick(): void {
    this.handlePrevClick.emit();
  }

  onNextClick(): void {
    this.handleNexClick.emit();
  }
}
