import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { ProfileInfoComponent } from '../info/info.component';
import { ProfileOutreachComponent } from '../outreach/outreach.component';
import { environment } from '../../../../environments/environment';
import { AuthStore } from '../../../shared/store/auth.store';
import { LucideAngularModule, LucideIconData, Telescope, Info } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    ApiImgPipe,
    NgOptimizedImage,
    CommonModule,
    ProfileInfoComponent,
    ProfileOutreachComponent,
    LucideAngularModule,
  ],
})
export class ProfileComponent {
  accUrl = environment.accountUrl;
  activeTab = signal<string>('Mes informations');
  tabs = signal<{ label: string; icon: LucideIconData }[]>([
    { label: 'Mes informations', icon: Info },
    { label: 'Vulgarisation', icon: Telescope },
  ]);
  roles = signal<{ name: string; label: string }[]>([
    { name: 'cartographer-assistant', label: 'Assistant cartographe' },
    { name: 'admin', label: 'Administrateur' },
    { name: 'cartograph', label: 'Cartographe' },
    { name: 'explorator', label: 'Explorateur' },
    { name: 'experimentor', label: 'Expérimentateur' },
    { name: 'user', label: 'Utilisateur' },
  ]);
  authStore = inject(AuthStore);

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  hasRole(roles: string[] | undefined): boolean {
    if (!roles) return false;
    const required = ['admin', 'cartograph', 'explorator', 'experimentor', 'cartographer-assistant'];
    return roles.some((role) => required.includes(role));
  }

  findRoleLabel(roles: string[] | undefined): string {
    if (!roles) return '';
    return this.roles()
      .filter((r) => roles.includes(r.name))
      .map((r) => r.label)
      .join(', ');
  }
}
