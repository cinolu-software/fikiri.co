import { Component, inject, input, NgZone, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../data-access/profile.service';
import { IUser } from '../../../shared/utils/types/models.type';
import { environment } from '../../../../environments/environment';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';

@Component({
  imports: [CommonModule],
  providers: [ProfileService],
  selector: 'app-profile-outreach',
  templateUrl: './outreach.component.html',
})
export class ProfileOutreachComponent implements OnInit {
  user = input<IUser>();
  copied = signal<boolean>(false);
  appUrl = environment.appUrl;
  countByOutreacher$: Observable<IAPIResponse<IUser[]>> | undefined;
  generateLink$: Observable<IAPIResponse<IUser>> | undefined;
  #profileService = inject(ProfileService);
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

  ngOnInit(): void {
    this.countByOutreacher$ = this.#profileService.getByOutreacher(this.user()?.email);
  }

  generatePopularizationLink(): void {
    this.generateLink$ = this.#profileService.generateOutreacherLink();
  }
}
