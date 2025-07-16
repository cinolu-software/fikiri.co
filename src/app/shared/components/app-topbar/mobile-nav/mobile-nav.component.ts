import { Component, input, output, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../../pipes/api-img.pipe';
import { IUser } from '../../../utils/types/models.type';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from '../../../helpers/get-links.fn';
import { LucideAngularModule, ChevronRight, Menu, X, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterModule, NgOptimizedImage, CommonModule, LucideAngularModule, ApiImgPipe],
  templateUrl: './mobile-nav.component.html',
})
export class MobileNavComponent {
  user = input.required<IUser | null>();
  tabs = input.required<string[]>();
  links = input.required<Record<string, ILink[]>>();
  singOut = output<void>();
  isOpen = signal<boolean>(false);
  activeTab = signal<string>('');
  getLinks = getLinks;
  icons = {
    menu: Menu,
    close: X,
    chevronRight: ChevronRight,
    back: ArrowLeft,
  };

  toogleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  handleSignOut(): void {
    this.singOut.emit();
  }

  closeNav(): void {
    this.isOpen.set(false);
    this.activeTab.set('');
  }
}
