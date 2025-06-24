import { Component, inject, input, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../shared/utils/types/models.type';
import { environment } from '../../../../environments/environment';
import { OutreachStore } from '../../data-access/outreach.store';

@Component({
  imports: [CommonModule],
  providers: [OutreachStore],
  selector: 'app-profile-outreach',
  templateUrl: './outreach.component.html',
})
export class ProfileOutreachComponent {
  user = input<IUser>();
  copied = signal<boolean>(false);
  appUrl = environment.appUrl;
  store = inject(OutreachStore);
  #ngZone = inject(NgZone);

  async copyLink(link: string) {
    await navigator.clipboard.writeText(link);
    this.copied.set(true);
    this.#ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    });
  }

  generateLink(): void {
    this.store.generateLink();
  }
}
