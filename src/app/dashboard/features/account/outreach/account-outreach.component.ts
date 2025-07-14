import { Component, inject, input, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { IUser } from '../../../../shared/utils/types/models.type';
import { OutreachStore } from '../../../data-access/account/outreach.store';

@Component({
  imports: [CommonModule],
  providers: [OutreachStore],
  selector: 'app-account-outreach',
  templateUrl: './account-outreach.component.html',
})
export class AccountOutreachComponent {
  user = input<IUser>();
  outreached = input.required<number | null>();
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
