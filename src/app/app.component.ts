import { afterNextRender, Component, inject, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { LoadingBarComponent } from './shared/ui/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, LoadingBarComponent],
})
export class AppComponent {
  #ngZone = inject(NgZone);

  constructor() {
    afterNextRender(() => {
      this.#ngZone.runOutsideAngular(() => {
        AOS.init({
          offset: 50,
        });
      });
    });
  }
}
