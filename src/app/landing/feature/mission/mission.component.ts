import { Component } from '@angular/core';
import { MISSIONS } from '../../utils/data/mission';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-mission',
  imports: [NgIcon],
  templateUrl: './mission.component.html'
})
export class MissionComponent {
  mission = MISSIONS;
}
