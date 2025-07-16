import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash, Download } from 'lucide-angular';
import { DashboardUsersStore } from '../../data-access/users/users.store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { QueryParams } from '../../utils/types/users/query-params';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DownloadUsersStore } from '../../data-access/users/download-users.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [DashboardUsersStore, DownloadUsersStore],
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
export class DashboardUsersComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(DashboardUsersStore);
  downloadStore = inject(DownloadUsersStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, download: Download };
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParamMap.get('page')) || 1,
  });

  loadUsers(): void {
    this.store.loadUsers(this.queryParams());
  }

  onPageChange(event: PaginatorState): void {
    this.queryParams.set({
      page: (event?.page || 0) + 1,
    });
    this.updateRouteAndUsers();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/dashboard/users'], { queryParams });
  }

  updateRouteAndUsers(): void {
    this.updateRoute();
    this.loadUsers();
  }

  downloadUsers(): void {
    this.downloadStore.downloadUsers();
  }
}
