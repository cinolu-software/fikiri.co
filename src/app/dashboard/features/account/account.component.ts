import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, LucideIconData, Telescope, Info } from 'lucide-angular';
import { ProfileInfoComponent } from './info/account-info.component';
import { AccountOutreachComponent } from './outreach/account-outreach.component';
import { environment } from '../../../../environments/environment';
import { AuthStore } from '../../../shared/store/auth.store';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  imports: [
    NgOptimizedImage,
    CommonModule,
    LucideAngularModule,
    ProfileInfoComponent,
    AccountOutreachComponent,
    ApiImgPipe,
  ],
})
export class AccountComponent {
  accUrl = environment.accountUrl;
  activeTab = signal<string>('Mes informations');
  authStore = inject(AuthStore);
  tabs = signal<{ label: string; icon: LucideIconData }[]>([
    { label: 'Mes informations', icon: Info },
    { label: 'Vulgarisation', icon: Telescope },
  ]);

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }
}
