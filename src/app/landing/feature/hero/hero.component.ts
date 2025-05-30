
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fadeInStagger } from '../../../shared/animations/fade';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  animations: [fadeInStagger]
})
export class HeroComponent {}
