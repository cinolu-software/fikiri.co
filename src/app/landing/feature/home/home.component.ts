import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { SdgsComponent } from '../sdgs/sdgs.component';
import { LatestCallsComponent } from '../latest-calls/latest-calls.component';
import { AboutComponent } from '../about/about.component';
import { MissionComponent } from '../mission/mission.component';
import { WinningSolutionsComponent } from '../winning-solutions/winning-solutions.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    SdgsComponent,
    LatestCallsComponent,
    AboutComponent,
    MissionComponent,
    WinningSolutionsComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
