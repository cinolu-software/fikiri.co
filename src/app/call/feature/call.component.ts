import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { ICall, IUser } from '../../shared/utils/types/models.type';
import { CallService } from '../data-access/call.service';
import { ApiImgPipe } from '../../shared/pipes/api-img.pipe';
import { Store } from '@ngrx/store';
import { selectUser } from '../../shared/store/auth/auth.reducers';
import { FormsModule } from '@angular/forms';
import { CallSkeletonComponent } from '../ui/call-skeleton/call-skeleton.component';
import { NgIcon } from '@ng-icons/core';
import { ApplicationComponent } from './application/application.component';

@Component({
  selector: 'app-call',
  providers: [CallService],
  imports: [
    CommonModule,
    RouterModule,
    NgIcon,
    ApiImgPipe,
    NgOptimizedImage,
    FormsModule,
    ApplicationComponent,
    CallSkeletonComponent,
  ],
  templateUrl: './call.component.html',
})
export class CallComponent implements OnInit {
  call$: Observable<IAPIResponse<ICall>> | undefined;
  user$: Observable<IUser | null> | undefined;
  #callsService = inject(CallService);
  #route = inject(ActivatedRoute);
  #location = inject(Location);
  #store = inject(Store);

  ngOnInit(): void {
    this.user$ = this.#store.select(selectUser);
    const id = this.#route.snapshot.paramMap.get('id');
    if (!id) return;
    this.call$ = this.#callsService.getOne(id);
  }

  isPast(date: Date): boolean {
    return new Date(date) < new Date();
  }

  back(): void {
    this.#location.back();
  }
}
