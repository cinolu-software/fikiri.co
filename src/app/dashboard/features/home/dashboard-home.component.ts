import { Component, inject } from '@angular/core';
import { DashboardHomeStore } from '../../data-access/dashboard/dashboard-home.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, PhoneCall, Megaphone, UserCog, Lightbulb } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  providers: [DashboardHomeStore],
  imports: [LucideAngularModule, ProgressSpinnerModule],
})
export class DashboardHomeComponent {
  store = inject(DashboardHomeStore);
  icons = {
    phoneCall: PhoneCall,
    megaphone: Megaphone,
    userCog: UserCog,
    lightbulb: Lightbulb,
  };
}
