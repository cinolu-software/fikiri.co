import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash } from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { QueryParams } from '../../utils/types/users/query-params';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DashboardOutreachersStore } from '../../data-access/outreachers/dashboard-outreachers.store';

@Component({
  selector: 'app-dashboard-outreachers',
  templateUrl: './dashboard-outreachers.component.html',
  providers: [DashboardOutreachersStore],
  imports: [LucideAngularModule, CommonModule, TableModule, ButtonModule, ProgressSpinnerModule, PaginatorModule],
})
export class DashboardOutreachersComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(DashboardOutreachersStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash };
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParamMap.get('page')) || 1,
  });

  loadOutreachers(): void {
    this.store.loadOutreachers(this.queryParams());
  }

  onPageChange(event: PaginatorState): void {
    this.queryParams.set({
      page: (event?.page || 0) + 1,
    });
    this.updateRouteAndOutreachers();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/dashboard/outreachers'], { queryParams });
  }

  updateRouteAndOutreachers(): void {
    this.updateRoute();
    this.loadOutreachers();
  }
}
