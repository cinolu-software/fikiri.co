import { afterNextRender, inject, Injectable, NgZone } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  #notyf: Notyf | null = null;
  #ngZone = inject(NgZone);

  constructor() {
    afterNextRender(() => {
      this.#ngZone.runOutsideAngular(() => {
        this.#notyf = new Notyf({
          duration: 4000,
          position: { x: 'left', y: 'top' },
        });
      });
    });
  }

  showSuccess(message: string): void {
    this.#notyf?.success(message);
  }

  showError(message: string): void {
    this.#notyf?.error(message);
  }
}
