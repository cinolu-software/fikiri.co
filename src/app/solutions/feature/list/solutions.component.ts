import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from '../../types/query-params.type';
import { Router } from '@angular/router';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ISolution } from '../../../shared/utils/types/models.type';
import { SolutionsService } from '../../data-access/solutions.service';
import { SolutionCardSkeletonComponent } from '../../ui/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionCardComponent } from '../../ui/solution-card/solution-card.component';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  providers: [SolutionsService],
  imports: [CommonModule, SolutionCardComponent, SolutionCardSkeletonComponent, NgxPaginationModule]
})
export class SolutionsComponent implements OnInit {
  #solutionsService = inject(SolutionsService);
  #router = inject(Router);
  solutions$: Observable<IAPIResponse<[ISolution[], number]>> | undefined;
  queryParams = signal<QueryParams>({
    page: this.#router.routerState.snapshot.root.queryParams['page'] || null
  });

  ngOnInit(): void {
    this.loadSolutions();
  }

  loadSolutions(): void {
    this.solutions$ = this.#solutionsService.getSolutions(this.queryParams());
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
