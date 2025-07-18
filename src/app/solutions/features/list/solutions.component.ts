import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from '../../types/query-params.type';
import { ActivatedRoute, Router } from '@angular/router';
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
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });
  store = inject(SolutionsStore);

  loadSolutions(): void {
    this.store.loadSolutions(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndSolutions();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/solutions'], { queryParams });
  }

  updateRouteAndSolutions(): void {
    this.updateRoute();
    this.loadSolutions();
  }
}
