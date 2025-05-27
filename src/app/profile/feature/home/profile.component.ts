import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { ProfileInfoComponent } from '../info/info.component';
import { ProfileOutreachComponent } from '../outreach/outreach.component';
import { NgIcon } from '@ng-icons/core';
import { selectUser } from '../../../shared/store/auth/auth.reducers';
import { IUser } from '../../../shared/utils/types/models.type';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [ApiImgPipe, CommonModule, ProfileInfoComponent, ProfileOutreachComponent, NgIcon],
})
export class ProfileComponent implements OnInit {
  #store = inject(Store);
  user$: Observable<IUser | null> | undefined;
  accUrl = environment.accountUrl;
  activeTab = signal<string>('Mes informations');
  tabs = signal<{ label: string; icon: string }[]>([
    { label: 'Mes informations', icon: 'matInfoOutline' },
    { label: 'Vulgarisation', icon: 'matCampaignOutline' },
  ]);
  roles = signal<{ name: string; label: string }[]>([
    { name: 'admin', label: 'Administrateur' },
    { name: 'cartograph', label: 'Cartographe' },
    { name: 'explorator', label: 'Explorateur' },
    { name: 'experimentor', label: 'Expérimentateur' },
    { name: 'user', label: 'Utilisateur' },
  ]);

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  hasRole(roles: string[] | undefined): boolean {
    if (!roles) return false;
    const requiredRoles = ['admin', 'cartograph', 'explorator', 'experimentor'];
    return roles.some((role) => requiredRoles.includes(role));
  }

  findRoleLabel(roles: string[] | undefined): string {
    if (!roles) return '';
    return this.roles()
      .filter((r) => roles.includes(r.name))
      .map((r) => r.label)
      .join(', ');
  }
}
