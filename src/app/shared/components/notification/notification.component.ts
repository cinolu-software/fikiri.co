import { NgClass } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notification.component.html'
})
export class MessageComponent implements OnChanges {
  message = input<string | null>(null);
  type = input<'success' | 'error' | null>(null);
  handleClose = output<void>();

  close(): void {
    this.handleClose.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentValue = changes['message'].currentValue;
    if (currentValue) {
      setTimeout(() => this.close(), 5000);
    }
  }
}
