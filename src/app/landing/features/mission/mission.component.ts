import { Component } from '@angular/core';
import { MISSIONS } from '../../utils/data/mission';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mission',
  imports: [LucideAngularModule],
  templateUrl: './mission.component.html',
})
export class MissionComponent {
  mission = MISSIONS;
}
