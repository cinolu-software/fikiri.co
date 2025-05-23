import { Component } from '@angular/core';
import { ABOUT } from '../../utils/data/about';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  aboutData = ABOUT;
}
