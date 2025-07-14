import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiImgPipe } from '../../shared/pipes/api-img.pipe';
import { FormsModule } from '@angular/forms';
import { CallSkeletonComponent } from '../ui/call-skeleton/call-skeleton.component';
import { ApplicationComponent } from './application/application.component';
import { CallStore } from '../data-access/call.store';
import { AuthStore } from '../../shared/store/auth.store';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-call',
  providers: [CallStore],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    ApiImgPipe,
    NgOptimizedImage,
    FormsModule,
    ApplicationComponent,
    CallSkeletonComponent,
  ],
  templateUrl: './call.component.html',
})
export class CallComponent {
  #location = inject(Location);
  store = inject(CallStore);
  authStore = inject(AuthStore);
  icons = {
    back: ArrowLeft,
  };

  isPast(date: Date): boolean {
    return new Date(date) < new Date();
  }

  back(): void {
    this.#location.back();
  }
}
