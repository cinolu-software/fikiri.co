import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from '../../types/query-params.type';
import { Router } from '@angular/router';
import { SolutionCardSkeletonComponent } from '../../ui/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionCardComponent } from '../../ui/solution-card/solution-card.component';
import { SolutionsStore } from '../../data-access/solutions.store';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  providers: [SolutionsStore],
  imports: [CommonModule, SolutionCardComponent, SolutionCardSkeletonComponent, NgxPaginationModule],
})
export class SolutionsComponent {
  #router = inject(Router);
  queryParams = signal<QueryParams>({
    page: this.#router.routerState.snapshot.root.queryParams['page'] || null,
  });
  store = inject(SolutionsStore);

  loadSolutions(): void {
    this.store.loadSolutions(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndSolutions();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/solutions'], { queryParams });
  }

  updateRouteAndSolutions(): void {
    this.updateRoute();
    this.loadSolutions();
  }
}
