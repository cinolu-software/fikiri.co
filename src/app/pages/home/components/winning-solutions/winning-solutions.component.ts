import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WinningSolutionsStoreInterface } from './types/winning-solutions-store.interface';
import { WinningSolutionsStore } from './data-access/winning-solutions.store';
import { WinningSolutionsService } from './data-access/winning-solutions.service';
import { SolutionCardSkeletonComponent } from '../../../../shared/components/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionCardComponent } from '../../../../shared/components/solution-card/solution-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-winning-solutions',
  standalone: true,
  imports: [SolutionCardComponent, CommonModule, SolutionCardSkeletonComponent, RouterLink],
  providers: [WinningSolutionsService, WinningSolutionsStore],
  templateUrl: './winnging-solutions.component.html'
})
export class WinningSolutionsComponent implements OnInit {
  vm$: Observable<WinningSolutionsStoreInterface>;

  constructor(private store: WinningSolutionsStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.loadSolutions();
  }
}
