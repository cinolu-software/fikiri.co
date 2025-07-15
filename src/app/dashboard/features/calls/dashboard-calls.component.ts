import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash } from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { QueryParams } from '../../utils/types/users/query-params';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DashboardCallsStore } from '../../data-access/calls/dashboard-calls.store';

@Component({
  selector: 'app-dashboard-calls',
  templateUrl: './dashboard-calls.component.html',
  providers: [DashboardCallsStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    PaginatorModule,
    ApiImgPipe,
    AvatarModule,
  ],
})
export class DashboardCallsComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(DashboardCallsStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash };
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParamMap.get('page')) || 1,
  });

  loadCalls(): void {
    this.store.loadCalls(this.queryParams());
  }

  onPageChange(event: PaginatorState): void {
    this.queryParams.set({
      page: (event?.page || 0) + 1,
    });
    this.updateRouteAndCalls();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/dashboard/calls'], { queryParams });
  }

  updateRouteAndCalls(): void {
    this.updateRoute();
    this.loadCalls();
  }
}
