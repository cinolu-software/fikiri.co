import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { QueryParams } from '../../utils/types/query-params';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardCallsStore } from '../../data-access/calls/calls.store';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  providers: [DashboardCallsStore],
  imports: [LucideAngularModule, CommonModule, ButtonModule, ProgressSpinnerModule, ApiImgPipe, AvatarModule],
})
export class DashboardCallsComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(DashboardCallsStore);
  skeletonArray = Array.from({ length: 60 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash };
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  loadCalls(): void {
    this.store.loadCalls(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndCalls();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/calls'], { queryParams });
  }

  updateRouteAndCalls(): void {
    this.updateRoute();
    this.loadCalls();
  }
}
