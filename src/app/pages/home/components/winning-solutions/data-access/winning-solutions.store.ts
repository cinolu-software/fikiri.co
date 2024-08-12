import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { WinningSolutionsStoreInterface } from '../types/winning-solutions-store.interface';
import { exhaustMap, Observable, tap } from 'rxjs';
import { WinningSolutionsService } from './winning-solutions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import { ISolution } from '../../../../../shared/types/models.interfaces';

@Injectable()
export class WinningSolutionsStore extends ComponentStore<WinningSolutionsStoreInterface> {
  vm$: Observable<WinningSolutionsStoreInterface>;

  constructor(private winningSolutionsService: WinningSolutionsService) {
    super({ isLoading: false, solutions: [], error: null });
    this.vm$ = this.select((state) => state);
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setSolutions = this.updater((state, solutions: ISolution[]) => ({ ...state, solutions }));
  setError = this.updater((state, error: string) => ({ ...state, error }));

  loadSolutions = this.effect<void>((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      exhaustMap(() =>
        this.winningSolutionsService.getWinningSolutions().pipe(
          tapResponse({
            next: (solutions) => this.setSolutions(solutions),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}
