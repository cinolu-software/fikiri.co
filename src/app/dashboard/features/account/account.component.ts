import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule, LucideIconData, Telescope, Info } from 'lucide-angular';
import { ProfileInfoComponent } from './info/account-info.component';
import { AccountOutreachComponent } from './outreach/account-outreach.component';
import { AuthStore } from '../../../shared/store/auth.store';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { OutreachStore } from '../../data-access/account/outreach.store';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  providers: [OutreachStore],
  imports: [
    NgOptimizedImage,
    CommonModule,
    LucideAngularModule,
    ProfileInfoComponent,
    AccountOutreachComponent,
    ApiImgPipe,
  ],
})
export class AccountComponent implements OnInit {
  activeTab = signal<string>('Mes informations');
  authStore = inject(AuthStore);
  outreachStore = inject(OutreachStore);
  tabs = signal<{ label: string; icon: LucideIconData }[]>([
    { label: 'Mes informations', icon: Info },
    { label: 'Vulgarisation', icon: Telescope },
  ]);

  ngOnInit(): void {
    this.outreachStore.countOutreaches();
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }
}
