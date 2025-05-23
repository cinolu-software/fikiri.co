import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ISolution } from '../../../shared/utils/types/models.type';
import { SolutionsService } from '../../../solutions/data-access/solutions.service';
import { SolutionCardSkeletonComponent } from '../../../solutions/ui/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionCardComponent } from '../../../solutions/ui/solution-card/solution-card.component';

@Component({
  selector: 'app-winning-solutions',
  providers: [SolutionsService],
  imports: [SolutionCardComponent, NgIcon, CommonModule, SolutionCardSkeletonComponent, RouterLink],
  templateUrl: './winnging-solutions.component.html'
})
export class WinningSolutionsComponent implements OnInit {
  solutions$: Observable<IAPIResponse<ISolution[]>> | undefined;
  #solutionsService = inject(SolutionsService);

  ngOnInit(): void {
    this.solutions$ = this.#solutionsService.getWinningSolutions();
  }
}
