import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash, Search, Download } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { QueryParams } from '../../utils/types/query-params';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardCallsStore } from '../../data-access/calls/calls.store';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DownloadCallsStore } from '../../data-access/calls/dowload-csv.store';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  providers: [DashboardCallsStore, DownloadCallsStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    ProgressSpinnerModule,
    ApiImgPipe,
    InputTextModule,
    AvatarModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class DashboardCallsComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  searchForm: FormGroup;
  store = inject(DashboardCallsStore);
  downloadStore = inject(DownloadCallsStore);
  skeletonArray = Array.from({ length: 60 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, search: Search, download: Download };
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
  }

  loadCalls(): void {
    this.store.loadCalls(this.queryParams());
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/calls'], { queryParams });
  }

  updateRouteAndCalls(): void {
    this.updateRoute();
    this.loadCalls();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndCalls();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams().q = null;
    this.updateRouteAndCalls();
  }

  onDownloadCalls(): void {
    this.downloadStore.downloadCalls(this.queryParams());
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams().q = searchValue ? searchValue : null;
    this.queryParams().page = null;
    this.updateRouteAndCalls();
  }
}
