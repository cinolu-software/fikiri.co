import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { QueryParams } from '../../utils/types/query-params';
import { LucideAngularModule, RefreshCcw, Download, Search } from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardOutreachersStore } from '../../data-access/outreachers/outreachers.store';
import { AvatarModule } from 'primeng/avatar';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { DownloadOutreachersStore } from '../../data-access/outreachers/dowload-csv.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-outreachers',
  templateUrl: './outreachers.component.html',
  providers: [DashboardOutreachersStore, DownloadOutreachersStore],
  imports: [
    LucideAngularModule,
    AvatarModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ApiImgPipe,
    InputTextModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
})
export class DashboardOutreachersComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  searchForm: FormGroup;
  store = inject(DashboardOutreachersStore);
  downloadStore = inject(DownloadOutreachersStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, download: Download, search: Search };
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
  }

  loadOutreachers(): void {
    this.store.loadOutreachers(this.queryParams());
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/outreachers'], { queryParams });
  }

  updateRouteAndOutreachers(): void {
    this.updateRoute();
    this.loadOutreachers();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndOutreachers();
  }

  onDownloadOutreachers(): void {
    this.downloadStore.downloadOutreachers(this.queryParams());
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams().q = null;
    this.updateRouteAndOutreachers();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams().q = searchValue ? searchValue : null;
    this.queryParams().page = null;
    this.updateRouteAndOutreachers();
  }
}
