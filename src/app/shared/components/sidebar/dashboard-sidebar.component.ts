import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { AuthStore } from '../../store/auth.store';
import { PROFILE_LINKS } from '../../utils/data/links';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent {
  links = signal(PROFILE_LINKS);
  activeTab = signal('Mon compte');
  authStore = inject(AuthStore);
  icons = {
    back: ArrowLeft,
  };

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  logout(): void {
    this.authStore.signOut();
  }
}
