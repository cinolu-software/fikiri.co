import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from '../../../helpers/get-links.fn';
import { IUser } from '../../../utils/types/models.type';
import { LucideAngularModule, Menu, X, ChevronDown, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  imports: [LucideAngularModule, RouterModule, CommonModule],
})
export class MobileNavComponent {
  user = input.required<IUser | null>();
  links = input.required<ILink[]>();
  singOut = output<void>();
  isOpen = signal<boolean>(false);
  getLinks = getLinks;
  icons = {
    menu: Menu,
    close: X,
    arrowDown: ChevronDown,
    moveLeft: ArrowLeft,
  };

  toogleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  handleSignOut(): void {
    this.singOut.emit();
  }

  closeNav(): void {
    this.isOpen.set(false);
  }
}
