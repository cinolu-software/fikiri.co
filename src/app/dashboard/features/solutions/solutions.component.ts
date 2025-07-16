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
import { SolutionsStore } from '../../data-access/solutions/solutions.store';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  providers: [SolutionsStore],
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
export class DashboardSolutionsComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(SolutionsStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash };
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParamMap.get('page')) || 1,
  });

  loadSolutions(): void {
    this.store.loadSolutions(this.queryParams());
  }

  onPageChange(event: PaginatorState): void {
    this.queryParams.set({
      page: (event?.page || 0) + 1,
    });
    this.updateRouteAndSolutions();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/dashboard/solutions'], { queryParams });
  }

  updateRouteAndSolutions(): void {
    this.updateRoute();
    this.loadSolutions();
  }
}
