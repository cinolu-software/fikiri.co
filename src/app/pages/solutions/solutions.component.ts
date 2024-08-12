import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { SolutionCardComponent } from '../../shared/components/solution-card/solution-card.component';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import { SolutionCardSkeletonComponent } from '../../shared/components/solution-card-skeleton/solution-card-skeleton.component';
import { SolutionsStoreInterface } from './types/solutions-store.interface';
import { SolutionsStore } from './data-access/solutions.store';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from './types/query-params.interface';
import { InputComponent } from '../../shared/ui/input/input.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchResult } from './types/search-response.interface';

@Component({
  selector: 'app-solutions',
  standalone: true,
  templateUrl: './solutions.component.html',
  providers: [SolutionsStore],
  imports: [
    RouterLink,
    CommonModule,
    SolutionCardComponent,
    SpinnerComponent,
    SolutionCardSkeletonComponent,
    NgComponentOutlet,
    NgxPaginationModule,
    InputComponent,
    ButtonComponent,
    NgSelectModule
  ]
})
export class SolutionsComponent implements OnInit {
  vm$: Observable<SolutionsStoreInterface>;
  openSearchResult = true;
  queryParams: QueryParams = { page: null, event: null, thematic: null };
  constructor(private store: SolutionsStore) {
    this.vm$ = this.store.vm$;
  }

  ngOnInit(): void {
    this.store.getEvents();
    this.store.getSolutions(this.queryParams);
  }

  loadFilteredSolutions(key: string, value: number): void {
    if (key !== 'page') {
      this.queryParams = { ...this.queryParams, page: 1 };
    }
    this.queryParams = { ...this.queryParams, [key]: value };
    this.store.getSolutions(this.queryParams);
  }

  onPageChange(page: number): void {
    this.loadFilteredSolutions('page', page);
    window.scrollTo({ top: 0 });
  }

  onThematicChange(e: Event): void {
    this.loadFilteredSolutions('thematic', +e);
  }

  onEventChange(e: Event): void {
    this.store.getThematics(+e);
    this.loadFilteredSolutions('event', +e);
  }

  onSearch(query: string): void {
    this.store.searchSolutions(query);
  }

  convertKeyToLowercase(key: string, hits: SearchResult): string {
    const value = hits[key as keyof SearchResult] as string;
    const valueArray = value.split(' ');
    return valueArray.map((word) => word.toLowerCase()).join(' ');
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isSearchInput = target.closest('.search-input');
    if (!isSearchInput) {
      this.openSearchResult = false;
    }
  }
}
