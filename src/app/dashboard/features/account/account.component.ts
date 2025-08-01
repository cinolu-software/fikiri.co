import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule, LucideIconData, Telescope, Info } from 'lucide-angular';
import { AccountInfoComponent } from './info/info.component';
import { AccountOutreachComponent } from './outreach/outreach.component';
import { AuthStore } from '../../../shared/store/auth.store';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { DashboardOutreachStore } from '../../data-access/account/outreach.store';

@Component({
  selector: 'app-dashboard-account',
  templateUrl: './account.component.html',
  providers: [DashboardOutreachStore],
  imports: [
    NgOptimizedImage,
    CommonModule,
    LucideAngularModule,
    AccountInfoComponent,
    AccountOutreachComponent,
    ApiImgPipe,
  ],
})
export class AccountComponent implements OnInit {
  activeTab = signal<string>('Mes informations');
  authStore = inject(AuthStore);
  outreachStore = inject(DashboardOutreachStore);
  tabs = signal<{ label: string; icon: LucideIconData }[]>([
    { label: 'Mes informations', icon: Info },
    { label: 'Vulgarisation', icon: Telescope },
  ]);

  ngOnInit(): void {
    this.outreachStore.loadOutreachCount();
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }
}
