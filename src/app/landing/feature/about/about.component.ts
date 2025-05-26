import { Component } from '@angular/core';
import { ABOUT } from '../../utils/data/about';
import { YtPlayerComponent } from '../../../shared/ui/yt-player/yt-player.component';

@Component({
  selector: 'app-about',
  imports: [YtPlayerComponent],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  aboutData = ABOUT;
}
