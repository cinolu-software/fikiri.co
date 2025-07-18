import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from '../../types/query-params.type';
import { ActivatedRoute, Router } from '@angular/router';
import { SolutionCardSkeletonComponent } from '../../ui/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionCardComponent } from '../../ui/solution-card/solution-card.component';
import { SolutionsStore } from '../../data-access/solutions.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, Search, RefreshCcw } from 'lucide-angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  providers: [SolutionsStore],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SolutionCardComponent,
    SolutionCardSkeletonComponent,
    NgxPaginationModule,
    LucideAngularModule,
    ProgressSpinnerModule,
  ],
})
export class SolutionsComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  searchForm: FormGroup;
  store = inject(SolutionsStore);
  skeletonArray = Array.from({ length: 20 }, (_, i) => i + 1);
  icons = { search: Search, refresh: RefreshCcw };
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
  }

  loadSolutions(): void {
    this.store.loadSolutions(this.queryParams());
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/solutions'], { queryParams });
  }

  updateRouteAndSolutions(): void {
    this.updateRoute();
    this.loadSolutions();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndSolutions();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams().q = null;
    this.updateRouteAndSolutions();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams().q = searchValue ? searchValue : null;
    this.queryParams().page = null;
    this.updateRouteAndSolutions();
  }
}
