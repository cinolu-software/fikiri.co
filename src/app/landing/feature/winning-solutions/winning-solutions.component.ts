import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SolutionCardSkeletonComponent } from '../../../solutions/ui/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionCardComponent } from '../../../solutions/ui/solution-card/solution-card.component';
import { WinningSolutionsStore } from '../../data-access/winning-solutions.store';
import { LucideAngularModule, MoveUpRight } from 'lucide-angular';

@Component({
  selector: 'app-winning-solutions',
  providers: [WinningSolutionsStore],
  imports: [SolutionCardComponent, LucideAngularModule, CommonModule, SolutionCardSkeletonComponent, RouterLink],
  templateUrl: './winnging-solutions.component.html',
})
export class WinningSolutionsComponent {
  store = inject(WinningSolutionsStore);
  icons = {
    moveUpRight: MoveUpRight,
  };
}
