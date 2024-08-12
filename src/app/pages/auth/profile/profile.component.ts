import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { UserSolutionsComponent } from './components/user-solutions/user-solutions.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [
    RouterLink,
    InfoComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent,
    CommonModule,
    SpinnerComponent,
    UserSolutionsComponent
  ]
})
export class ProfileComponent {
  activeTab = signal<'profil' | 'solutions'>('profil');

  switchTab(tab: 'profil' | 'solutions'): void {
    this.activeTab.set(tab);
  }
}
