import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { ISolution } from '../../../shared/utils/types/models.type';
import { SolutionCardSkeletonComponent } from '../../../solutions/ui/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionCardComponent } from '../../../solutions/ui/solution-card/solution-card.component';
import { WinningSolutionsStore } from '../../data-access/winning-solutions.store';

@Component({
  selector: 'app-winning-solutions',
  providers: [WinningSolutionsStore],
  imports: [SolutionCardComponent, NgIcon, CommonModule, SolutionCardSkeletonComponent, RouterLink],
  templateUrl: './winnging-solutions.component.html',
})
export class WinningSolutionsComponent {
  store = inject(WinningSolutionsStore);
}
