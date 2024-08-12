import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InfoStore } from './data-access/info.store';
import { Observable } from 'rxjs';
import { IUserInfoStore } from './types/info-store.interface';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { IUser } from '../../../../../shared/types/models.interfaces';
import { SpinnerComponent } from '../../../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-info',
  standalone: true,
  providers: [InfoStore],
  templateUrl: './info.component.html',
  imports: [NgOptimizedImage, CommonModule, SpinnerComponent, RouterModule]
})
export class InfoComponent {
  vm$: Observable<{ userInfoState: IUserInfoStore; user: IUser | null }>;

  constructor(private store: InfoStore) {
    this.vm$ = this.store.vm$;
  }

  displayProfile(user: IUser): string {
    if (user.profile) return environment.apiUrl + 'uploads/profiles/' + user.profile;
    return user.google_image;
  }

  splitUsername(user: IUser): string {
    const name = user.name.split(' ');
    return name[0][0].toUpperCase() + ' ' + (name[1] ? name[1][0].toUpperCase() : '');
  }

  onImageChange(event: Event, userId: number): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const file: File | undefined = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('thumb', file);
      this.store.updateImage({ file: formData, userId });
    }
  }
}
