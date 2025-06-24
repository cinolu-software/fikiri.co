import { Component, inject, signal } from '@angular/core';
import { ICall } from '../../../shared/utils/types/models.type';
import { QueryParams } from '../../utils/types/query-params.type';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { GalleriaModule } from 'primeng/galleria';
import { environment } from '../../../../environments/environment';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { CallsStore } from '../../data-access/calls.store';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-calls',
  providers: [CallsStore],
  imports: [CommonModule, LucideAngularModule, RouterLink, NgxPaginationModule, GalleriaModule, ApiImgPipe],
  templateUrl: './calls.component.html',
})
export class CallsComponent {
  #router = inject(Router);
  imgUrl = `${environment.apiUrl}uploads/calls/`;
  queryParams = signal<QueryParams>({
    page: this.#router.routerState.snapshot.root.queryParams['page'] || null,
  });
  responsiveOptions = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px', numVisible: 2 },
  ];
  icons = {
    arrowRight: ArrowRight,
  };
  store = inject(CallsStore);

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndSolutions();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/'], { queryParams });
  }

  loadCalls(): void {
    this.store.loadCalls(this.queryParams());
  }

  updateRouteAndSolutions(): void {
    this.updateRoute();
    this.loadCalls();
  }

  isPast(call: ICall): boolean {
    return new Date(call.ended_at) < new Date();
  }
}
