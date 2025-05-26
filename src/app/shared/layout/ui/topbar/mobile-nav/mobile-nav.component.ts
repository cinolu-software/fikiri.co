import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ApiImgPipe } from '../../../../pipes/api-img.pipe';
import { IUser } from '../../../../utils/types/models.type';
import { ILink } from '../../../utils/types/link.type';
import { getLinks } from '../../../../utils/helpers/get-links.fn';

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterModule, CommonModule, NgIcon, ApiImgPipe],
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
