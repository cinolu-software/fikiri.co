import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ICall } from '../../../shared/utils/types/models.type';
import { CarouselModule } from 'primeng/carousel';
import { NgIcon } from '@ng-icons/core';
import { carouselConfig } from '../../utils/config/carousel.conifg';
import { CallsService } from '../../../calls/data-access/calls.service';
import { CallCardComponent } from '../../../calls/ui/call-card/call-card.component';

@Component({
  selector: 'app-latest-calls',
  providers: [CallsService],
  imports: [CommonModule, RouterModule, NgIcon, CarouselModule, NgIcon, CallCardComponent],
  templateUrl: './latest-calls.component.html'
})
export class LatestCallsComponent implements OnInit {
  calls$: Observable<IAPIResponse<ICall[]>> | undefined;
  #callsService = inject(CallsService);
  carouselOptions = carouselConfig;

  ngOnInit(): void {
    this.calls$ = this.#callsService.getLatest();
  }
}
