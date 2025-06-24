import { afterNextRender, Component, signal } from '@angular/core';
import { ABOUT } from '../../utils/data/about';
import { YtPlayerComponent } from '../../../shared/ui/yt-player/yt-player.component';

@Component({
  selector: 'app-about',
  imports: [YtPlayerComponent],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  aboutData = ABOUT;
  isBrowser = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      this.isBrowser.set(true);
    });
  }
}
