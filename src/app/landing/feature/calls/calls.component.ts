import { Component, inject, OnInit, signal } from '@angular/core';
import { CallsService } from '../../data-access/calls.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICall } from '../../../shared/utils/types/models.type';
import { QueryParams } from '../../utils/types/query-params.type';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { GalleriaModule } from 'primeng/galleria';
import { environment } from '../../../../environments/environment';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-calls',
  providers: [CallsService],
  imports: [CommonModule, NgIcon, RouterLink, NgxPaginationModule, GalleriaModule, ApiImgPipe],
  templateUrl: './calls.component.html',
})
export class CallsComponent implements OnInit {
  #callsService = inject(CallsService);
  #router = inject(Router);
  calls$: Observable<IAPIResponse<[ICall[], number]>> | undefined;
  imgUrl = `${environment.apiUrl}uploads/calls/`;
  queryParams = signal<QueryParams>({
    page: this.#router.routerState.snapshot.root.queryParams['page'] || null,
  });
  responsiveOptions = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px', numVisible: 2 },
  ];

  ngOnInit(): void {
    this.calls$ = this.#callsService.getPublished(this.queryParams());
  }

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
    this.calls$ = this.#callsService.getPublished(this.queryParams());
  }

  updateRouteAndSolutions(): void {
    this.updateRoute();
    this.loadCalls();
  }

  isPast(call: ICall): boolean {
    return new Date(call.ended_at) < new Date();
  }
}
