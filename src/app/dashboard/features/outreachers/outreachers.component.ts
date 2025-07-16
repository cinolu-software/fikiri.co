import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash, Download } from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { QueryParams } from '../../utils/types/users/query-params';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DashboardOutreachersStore } from '../../data-access/outreachers/outreachers.store';
import { AvatarModule } from 'primeng/avatar';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { DownloadOutreachersStore } from '../../data-access/outreachers/dowload-outreacher.store';

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
    PaginatorModule,
    ApiImgPipe,
  ],
})
export class DashboardOutreachersComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(DashboardOutreachersStore);
  downloadStore = inject(DownloadOutreachersStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, download: Download };
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

  downloadOutreachers(): void {
    this.downloadStore.downloadOutreachers();
  }
}
