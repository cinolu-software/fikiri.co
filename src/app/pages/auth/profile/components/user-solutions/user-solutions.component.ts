import { Component, OnInit } from '@angular/core';
import { SolutionsStore } from './data-access/user-solutions.store';
import { Observable } from 'rxjs';
import { ISolutionsStore } from './types/user-solutions-store.type';
import { AsyncPipe, NgIf, NgOptimizedImage, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { ISolution } from '../../../../../shared/types/models.interfaces';
import { SpinnerComponent } from '../../../../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-user-solutions',
  standalone: true,
  providers: [SolutionsStore],
  imports: [NgIf, AsyncPipe, RouterLink, NgOptimizedImage, DatePipe, SpinnerComponent, RouterLink],
  templateUrl: './user-solutions.component.html'
})
export class UserSolutionsComponent implements OnInit {
  vm$: Observable<ISolutionsStore> = this.store.vm$;

  constructor(private store: SolutionsStore) {}

  ngOnInit(): void {
    this.store.getSolutions();
  }

  displayImage(solution: ISolution): string {
    return solution.images.length > 0
      ? `${environment.apiUrl}/uploads/solutions/${solution.images.at(-1)?.image_link}`
      : '/images/default-placeholder.png';
  }

  padWord(word: string): string {
    return word.slice(0, 10).padEnd(3, '...');
  }
}
