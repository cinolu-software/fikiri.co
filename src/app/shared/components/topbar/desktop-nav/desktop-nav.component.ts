import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../pipes/api-img.pipe';
import { IUser } from '../../../utils/types/models.type';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from '../../../helpers/get-links.fn';
import { LucideAngularModule, ChevronDown, LayoutGrid, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  imports: [CommonModule, LucideAngularModule, RouterModule, ApiImgPipe],
})
export class DesktopNavComponent {
  user = input.required<IUser | null>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  activeTab = signal<string>('');
  getLinks = getLinks;
  icons = {
    chevronDown: ChevronDown,
    dashboard: LayoutGrid,
    logOut: LogOut,
  };

  closeNav(): void {
    this.setActiveTab('');
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.singOut.emit();
    this.setActiveTab('');
  }
}
