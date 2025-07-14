import { Component, inject } from '@angular/core';
import { DashboardStore } from '../data-access/dashboard/dashboard.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, PhoneCall, Megaphone, UserCog, Lightbulb } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardStore],
  imports: [LucideAngularModule, ProgressSpinnerModule],
})
export class DashboardComponent {
  store = inject(DashboardStore);
  icons = {
    phoneCall: PhoneCall,
    megaphone: Megaphone,
    userCog: UserCog,
    lightbulb: Lightbulb,
  };
}
