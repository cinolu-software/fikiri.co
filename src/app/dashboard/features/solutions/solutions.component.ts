import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash, Download, Search } from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { QueryParams } from '../../utils/types/query-params';
import { ActivatedRoute, Router } from '@angular/router';
import { SolutionsStore } from '../../data-access/solutions/solutions.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { InputTextModule } from 'primeng/inputtext';
import { DownloadSolutionsStore } from '../../data-access/solutions/dowload-csv.store';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  providers: [SolutionsStore, DownloadSolutionsStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ApiImgPipe,
    AvatarModule,
    InputTextModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class DashboardSolutionsComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  store = inject(SolutionsStore);
  downloadStore = inject(DownloadSolutionsStore);
  searchForm: FormGroup;
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, download: Download, search: Search };
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
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/dashboard/solutions'], { queryParams });
  }

  updateRouteAndSolutions(): void {
    this.updateRoute();
    this.loadSolutions();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndSolutions();
  }

  onDownloadSolutions(): void {
    this.downloadStore.downloadSolutions(this.queryParams());
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
