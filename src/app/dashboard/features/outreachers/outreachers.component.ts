import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, Download } from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { QueryParams } from '../../utils/types/query-params';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardOutreachersStore } from '../../data-access/outreachers/outreachers.store';
import { AvatarModule } from 'primeng/avatar';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { DownloadOutreachersStore } from '../../data-access/outreachers/dowload-csv.store';

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
  ],
})
export class DashboardOutreachersComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(DashboardOutreachersStore);
  downloadStore = inject(DownloadOutreachersStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { download: Download };
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  loadOutreachers(): void {
    this.store.loadOutreachers(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndOutreachers();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
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
