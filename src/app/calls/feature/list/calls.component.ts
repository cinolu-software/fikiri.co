import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICall } from '../../../shared/utils/types/models.type';
import { CallsService } from '../../data-access/calls.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from '../../utils/query-params.type';
import { fadeInStagger } from '../../../shared/animations/fade';
import { CallCardSkeletonComponent } from '../../ui/call-card-skeleton/call-card-skeleton.component';
import { CallCardComponent } from '../../ui/call-card/call-card.component';

@Component({
  selector: 'app-calls',
  providers: [CallsService],
  imports: [CommonModule, NgxPaginationModule, RouterModule, CallCardSkeletonComponent, CallCardComponent],
  templateUrl: './calls.component.html',
  animations: [fadeInStagger]
})
export class CallsComponent implements OnInit {
  calls$: Observable<IAPIResponse<[ICall[], number]>> | undefined;
  #callsService = inject(CallsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.['page'] || 1)
  });

  handlePageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndEvents();
  }

  ngOnInit(): void {
    this.loadcalls();
  }

  loadcalls(): void {
    this.calls$ = this.#callsService.getPublished(this.queryParams());
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/calls'], { queryParams });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.loadcalls();
  }
}
